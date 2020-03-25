import React, { Component, ReactElement } from "react";
import ErrorIndicator from "../ErrorIndicator";

type Props = {
  children: ReactElement;
};
type State = {
  errorIndicator: boolean;
};
class ErrorBoundry extends Component<Props, State> {
  state = {
    errorIndicator: false
  };

  componentDidCatch() {
    this.setState({ errorIndicator: true });
  }

  render() {
    if (this.state.errorIndicator) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
