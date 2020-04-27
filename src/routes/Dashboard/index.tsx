import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

import './style.css';

const Dashboard = () => {
  return (
    <div className="viewport viewport--dashboard">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;
