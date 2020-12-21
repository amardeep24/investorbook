import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useCallback } from 'react';

import './App.css';
import Investors from './Investors';
import Companies from "./Companies";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Company from './Company';


function App() {
  const tabs = [{ name: "Investors", link: "/investors" }, { name: "Companies", link: "/companies" }];
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/investors">
            <Dashboard tabs={tabs} render={() => <Investors />} />
          </Route>
          <Route path="/companies">
            <Dashboard tabs={tabs} render={() => <Companies />} />
          </Route>
          <Route path="/investor/:id">
            <Company />
          </Route>
          <Route path="/company/:id">
            <Company />
          </Route>
          <Route path="/">
            <Dashboard tabs={tabs} render={() => <Investors />} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
