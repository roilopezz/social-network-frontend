import React from "react";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div>
        <h3>
          Page Not Found
          <i className="bi bi-shield-fill-exclamation ms-1 text-danger"></i>
        </h3>
      </div>
    </div>
  );
};

export default PageNotFound;
