import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import List from './List';

import './style.css';

const Endpoints = () => {
  return (
    <div className="viewport viewport--endpoints">
      <Header />
      <div className="endpoints">
        <div className="endpoints__container">
          <div className="endpoints__container__pad">
            <div className="container">
              <Route exact path="/" component={List} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endpoints;
