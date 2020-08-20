import React from 'react';

export default class ErrorBoundary extends React.Component {
    state = {
      hasError: false
    };

    componentDidCatch(error, errorInfo) {
      this.setState({ hasError : true });
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="flex-container">
            <p> Something was wrong </p>
          </div>
        );
      }

      return this.props.children;
    }
}
