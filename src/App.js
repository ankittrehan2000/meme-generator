import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import MoreInfo from "./Components/MoreInfo"

function App() {
  return (
    //Create router and other routes
    <Router>
      <Switch>
        <Route exact path="/" component= { Home }/>
        <Route path="/about" component ={ About } />
        <Route path="/info" component = { MoreInfo } />
      </Switch>
    </Router>
  );
}

export default App;
