import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Endpoints from 'routes/Endpoints';
import Dashboard from 'routes/Dashboard';

import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Endpoints} />
      <Route path="/endpoints/:id" component={Dashboard} />
    </Router>
  );
}

export default App;
