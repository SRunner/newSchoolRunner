import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import LoginPage from './jsx/login-page.jsx';
import App from './jsx/app.jsx';
import PersonalInfoPage from "./jsx/personal-page.jsx";
import HomePage from "./jsx/home-page.jsx";
import React from 'react';
import ReactDOM from 'react-dom';
require('jquery');
require("bootstrap-webpack");

const route = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRedirect to='/login-page'/>
    <Route path='/login-page' component={LoginPage}/>
    <Route path='/personalInfoPage' component={PersonalInfoPage}/>
    <Route path='/homePage' component={HomePage} />
  </Route>
</Router>;

ReactDOM.render(
  route,
  document.getElementById("content")
);

if (module.hot) {
  module.hot.accept();
}
