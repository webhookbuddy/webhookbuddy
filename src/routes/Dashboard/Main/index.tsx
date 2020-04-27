import React from 'react';
import Forwarder from './Forwarder';
import Tabs from './Tabs';
import Body from './Body';

import './style.css';

const Main = () => {
  return (
    <div className="main">
      <Forwarder />
      <Tabs />
      <Body />
    </div>
  );
};

export default Main;
