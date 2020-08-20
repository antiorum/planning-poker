import './error-page.sass';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h2>404</h2>
      <h2>Page Not Found</h2>
      <h3>
        <Link to={'/'}>To Main Page</Link>
      </h3>
    </div>
  );
};

export default ErrorPage;
