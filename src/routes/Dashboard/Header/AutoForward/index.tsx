import React from 'react';

import './style.css';

const AutoForward = () => {
  return (
    <div className="dash-header__auto-forward">
      <div className="dash-header__auto-forward__icon dash-header__auto-forward__icon--on">
        <i className="dash-header__auto-forward__icon__button fa fa-circle fa-2x"></i>
      </div>
      <div>
        <select className="custom-select" disabled>
          <option>http://foobar</option>
        </select>
      </div>
    </div>
  );
};

export default AutoForward;
