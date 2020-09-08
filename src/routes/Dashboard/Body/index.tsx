import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

import './style.css';

const Body = () => {
  return (
    <div className="body">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Body;
