import React, { ReactNode } from 'react';
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
