import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AllPost from './AllPost'
import CustomTextInput from './CustomTextInput'
import UserProfile from './UserProfile'


const routes = [
  {
    path: "/",
    exact: true,
    customertextinput: () => <CustomTextInput></CustomTextInput>,
    allpost: () => <AllPost></AllPost>,
  },

];
ReactDOM.render(
  // <React.Fragment> 
  //   <CustomTextInput></CustomTextInput>
  //   <AllPost></AllPost>
  // </React.Fragment>,
  <Router>
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          children={<route.customertextinput />}
        />
      ))}
    </Switch>

    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          children={<route.allpost />}
        />
      ))}
    </Switch>

    <Switch>
      <Route path="/:id" component={UserProfile} />
    </Switch>


  </Router>,

  document.getElementById('body')
);


