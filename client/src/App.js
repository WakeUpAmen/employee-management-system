import React, { Component } from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NewEmployee from './components/NewEmployee';
import EditEmployee from './components/EditEmployee';
import ChildrenList from './components/ChildrenList';


/* App component */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/editemployee/:employeeId" component={EditEmployee} />
            <Route path="/newemployee" component={NewEmployee} />
            </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
