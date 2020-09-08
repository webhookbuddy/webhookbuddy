import React from 'react';
import ResizePanel from 'react-resize-panel';
import Sidebar from './Sidebar';
import Main from './Main';

import './style.css';

const Body = () => {
  return (
    <div className="body">
      <ResizePanel direction="e">
        <Sidebar />
      </ResizePanel>
      <Main />
    </div>
  );
};

export default Body;
