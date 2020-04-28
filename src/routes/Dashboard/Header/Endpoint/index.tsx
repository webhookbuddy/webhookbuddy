import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const Endpoint = () => {
  return (
    <div className="dash-header__endpoint">
      <Link to="/">
        <i className="dash-header__endpoint__icon fa fa-exchange fa-2x"></i>
        <span className="dash-header__endpoint__title">
          ACME w/ Stripe
        </span>
      </Link>
    </div>
  );
};

export default Endpoint;
