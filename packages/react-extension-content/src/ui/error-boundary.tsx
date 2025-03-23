import { useVyuhStore } from '@vyuh/react-core';
import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Error Boundary component props
 */
export interface ErrorBoundaryProps {
  children: ReactNode;
  title: string;
  onRetry?: () => void;
  FallbackComponent?: React.ComponentType<{
    error: Error;
    onRetry?: () => void;
  }>;
}

/**
 * Error Boundary component state
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle errors in the component tree
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { plugins } = useVyuhStore.getState();

    plugins.telemetry?.log(this.props.title, 'error', { error });
  }

  private invokeRetry = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry?.();
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const Component =
        this.props.FallbackComponent || this.defaultFallbackComponent;

      return (
        <Component
          error={this.state.error}
          onRetry={this.props.onRetry ? this.invokeRetry : undefined}
        />
      );
    }

    return this.props.children;
  }

  private defaultFallbackComponent = ({
    error,
    onRetry,
  }: {
    error: Error;
    onRetry?: () => void;
  }) => {
    const { componentBuilder } = useVyuhStore.getState();

    return componentBuilder.renderError({
      title: this.props.title,
      error,
      onRetry,
    });
  };
}
