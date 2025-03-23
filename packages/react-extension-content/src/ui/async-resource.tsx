import { Observable, Subscription } from 'rxjs';

/**
 * Base interface for all async resources
 */
export interface IAsyncResource<T> {
  read(): T;
  dispose(): void;
  isLive(): boolean;
}

/**
 * Resource for suspense-based data fetching with Promises
 */
export class AsyncResource<T> implements IAsyncResource<T> {
  private result: T | null = null;
  private error: Error | null = null;
  private status: 'pending' | 'success' | 'error' = 'pending';
  private promise: Promise<T> | null = null;

  constructor(source: Promise<T>) {
    this.handlePromise(source);
  }

  private handlePromise(promise: Promise<T>) {
    this.promise = promise.then(
      (data) => {
        this.status = 'success';
        this.result = data;
        return data;
      },
      (error) => {
        this.status = 'error';
        this.error = error instanceof Error ? error : new Error(String(error));
        throw this.error;
      },
    );
  }

  read(): T {
    if (this.status === 'pending') {
      throw this.promise;
    } else if (this.status === 'error') {
      throw this.error;
    } else if (this.result === null) {
      throw new Error('No Content found');
    } else {
      return this.result;
    }
  }

  dispose() {
    // Nothing to dispose for Promise-based resources
  }

  /**
   * Returns whether this resource is backed by an Observable (true) or a Promise (false)
   */
  isLive(): boolean {
    return false;
  }
}

/**
 * Interface for resources that support live updates
 */
export interface ILiveAsyncResource<T> extends IAsyncResource<T> {
  subscribe(listener: () => void): () => void;
}

/**
 * Resource for suspense-based data fetching with Observables
 */
export class AsyncStreamResource<T> implements ILiveAsyncResource<T> {
  private result: T | null = null;
  private error: Error | null = null;
  private status: 'pending' | 'success' | 'error' = 'pending';
  private promise: Promise<T> | null = null;
  private subscription: Subscription | null = null;
  private listeners: Set<() => void> = new Set();
  private resolveInitialPromise: ((value: T) => void) | null = null;
  private rejectInitialPromise: ((error: Error) => void) | null = null;

  constructor(source: Observable<T>) {
    this.handleObservable(source);
  }

  private handleObservable(observable: Observable<T>) {
    // Create a promise for the initial value (for Suspense)
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolveInitialPromise = resolve;
      this.rejectInitialPromise = reject;
    });

    // Subscribe to the observable
    this.subscription = observable.subscribe({
      next: (data) => {
        const wasInitialLoad = this.status === 'pending';

        // Always update the result
        this.status = 'success';
        this.result = data;

        // Resolve the initial promise if this is the first emission
        if (wasInitialLoad && this.resolveInitialPromise) {
          this.resolveInitialPromise(data);
          this.resolveInitialPromise = null;
          this.rejectInitialPromise = null;
        } else {
          // Notify listeners of updates for subsequent emissions
          this.notifyListeners();
        }
      },
      error: (error) => {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));
        this.status = 'error';
        this.error = errorObj;

        // Reject the initial promise if it hasn't been resolved yet
        if (this.rejectInitialPromise) {
          this.rejectInitialPromise(errorObj);
          this.resolveInitialPromise = null;
          this.rejectInitialPromise = null;
        }

        this.notifyListeners();
      },
      complete: () => {
        // If observable completes without emitting, treat as error
        if (this.status === 'pending') {
          const error = new Error(
            'Observable completed without emitting a value',
          );
          this.status = 'error';
          this.error = error;

          if (this.rejectInitialPromise) {
            this.rejectInitialPromise(error);
            this.resolveInitialPromise = null;
            this.rejectInitialPromise = null;
          }

          this.notifyListeners();
        }
      },
    });
  }

  read(): T {
    if (this.status === 'pending') {
      throw this.promise;
    } else if (this.status === 'error') {
      throw this.error;
    } else if (this.result === null) {
      throw new Error('No Content found');
    } else {
      return this.result;
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  dispose() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.listeners.clear();
    this.resolveInitialPromise = null;
    this.rejectInitialPromise = null;
  }

  /**
   * Returns whether this resource is backed by an Observable (true) or a Promise (false)
   */
  isLive(): boolean {
    return true;
  }
}

/**
 * Factory function to create the appropriate resource based on the data source type
 */
export function createAsyncResource<T>(
  source: Promise<T> | Observable<T>,
): IAsyncResource<T> {
  if (source instanceof Promise) {
    return new AsyncResource<T>(source);
  } else {
    return new AsyncStreamResource<T>(source);
  }
}
