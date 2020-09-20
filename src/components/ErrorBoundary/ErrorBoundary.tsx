import React, { ReactNode, ComponentType } from 'react';
export interface ErrorBoundary {
  error: Error | null;
  children?: ReactNode;
}

export class ErrorBoundary extends React.Component<ReactNode> {
  state = { error: null };

  componentDidCatch(error: Error): void {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <h2>Something went wrong. We are already fixing it!</h2>;
    }
    return this.props.children;
  }
}

export const withErrorBoundary = <T,>(Component: ComponentType<T>) => {
  const withErrorBoundaryComponent = (props: T) => {
    return (
      <ErrorBoundary>
        <Component {...(props as T)} />
      </ErrorBoundary>
    );
  };

  return withErrorBoundaryComponent;
};
