import React from 'react';
import Endpoint from './Endpoint';
import AutoForward from './AutoForward';

import './style.css';

const Header = () => {
  return (
    <div className="dash-header">
      <Endpoint />
      <AutoForward />
    </div>
  );
};

export default Header;
