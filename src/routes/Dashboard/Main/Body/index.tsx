import React from 'react';
import Request from './Request';
import History from './History';

import './style.css';

const Body = () => {
  return (
    <div className="main__body">
      <div className="main__body__container">
        <Request />
        {/* <History /> */}
      </div>
    </div>
  );
};

export default Body;
