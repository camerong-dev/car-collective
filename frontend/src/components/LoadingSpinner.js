import Spinner from "react-bootstrap/Spinner";
import React from "react";

function LoadingSpinner(Component) {
  return function LoadingSpinnerComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;

    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };
}

export default LoadingSpinner;
