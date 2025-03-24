import { useVyuh, useVyuhStore } from '@vyuh/react-core';
import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Default fallback component for error boundary
 */
const DefaultFallbackComponent = ({
  error,
  onRetry,
  title,
}: {
  error: Error;
  onRetry?: () => void;
  title: string;
}) => {
  const { components } = useVyuh();

  return components.renderError({
    title,
    error,
    onRetry,
  });
};

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
      if (this.props.FallbackComponent) {
        const Component = this.props.FallbackComponent;
        return (
          <Component
            error={this.state.error}
            onRetry={this.props.onRetry ? this.invokeRetry : undefined}
          />
        );
      }

      return (
        <DefaultFallbackComponent
          error={this.state.error}
          onRetry={this.props.onRetry ? this.invokeRetry : undefined}
          title={this.props.title}
        />
      );
    }

    return this.props.children;
  }
}
