import React from 'react';

import './style.css';

const Header = () => {
  return (
    <div className="ep-header">
      <div className="ep-header__content">
        <span className="pointer">
          <i className="ep-header__icon fa fa-arrow-left fa-2x"></i>
          <span className="ep-header__title">Back</span>
        </span>
      </div>
    </div>
  );
};

export default Header;
