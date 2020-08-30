import React, { ReactNode } from 'react';
interface iState {
  error: Error | null;
  children?: ReactNode;
}

class ErrorBoundary extends React.Component<ReactNode, iState> {
  constructor(props: ReactNode) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error): void {
    this.setState({
      error: error,
    });
  }

  render(): ReactNode {
    if (this.state.error) {
      return <h2>Something went wrong. We are already fixing it!</h2>;
    }
    return this.props.children;
  }
}
export const Error = ErrorBoundary;
