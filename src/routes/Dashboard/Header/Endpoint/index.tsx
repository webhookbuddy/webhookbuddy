import React from 'react';

import './style.css';

const Endpoint = () => {
  return (
    <div className="dash-header__endpoint">
      <span className="pointer">
        <i className="dash-header__endpoint__icon fa fa-exchange fa-2x"></i>
        <span className="dash-header__endpoint__title">
          ACME w/ Stripe
        </span>
      </span>
    </div>
  );
};

export default Endpoint;
