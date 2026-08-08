import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="settings-page">
          <div className="settings-loading">
            Something went wrong while loading this page. Please try again.
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
