import React, { Component } from "react";
import ErrorIndicator from "../ErrorIndicator";

class ErrorBoundry extends Component {
  state = {
    errorIndicator: false
  };
  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { errorIndicator: true };
  }

  // componentDidCatch() {
  //   this.setState({ errorIndicator: true });
  // }

  render() {
    if (this.state.errorIndicator) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
