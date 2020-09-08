import React from 'react';
import Header from './Header';
import Body from './Body';

import './style.css';

const Dashboard = () => {
  return (
    <div className="viewport viewport--dashboard">
      <Header />
      <Body />
    </div>
  );
};

export default Dashboard;
