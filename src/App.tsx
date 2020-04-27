import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from 'routes/Dashboard';
import Endpoints from 'routes/Endpoints';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Dashboard} />
      <Route path="/endpoints" component={Endpoints} />
    </Router>
  );
}

export default App;
