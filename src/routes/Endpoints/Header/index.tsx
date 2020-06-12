import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

const Header = () => {
  const history = useHistory();

  // history.length 2 seems to be the default for both HashRouter and BrowserRouter

  return (
    <div className="ep-header" onClick={() => history.goBack()}>
      <div
        className={`ep-header__content ${
          history.length < 3 ? 'invisible' : 'visible'
        }`}
      >
        <span className="pointer">
          <i className="ep-header__icon fa fa-arrow-left fa-2x"></i>
          <span className="ep-header__title">Back</span>
        </span>
      </div>
    </div>
  );
};

export default Header;
