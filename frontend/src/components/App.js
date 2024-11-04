import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncidentForm from './components/IncidentForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/report-incident" component={IncidentForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
