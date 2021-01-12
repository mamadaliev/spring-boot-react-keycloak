import React from "react";
import {Switch, Route} from "react-router";
import {BrowserRouter, Link, Redirect} from "react-router-dom";

import {isAuthenticated, logout} from "./service/AuthService";
import LoginFormComponent from "./components/auth/LoginFormComponent";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/about"><About/></Route>
          <Route path="/dashboard"><Dashboard/></Route>
          <Route path="/login"><LoginFormComponent/></Route>
          <Route path="/logout">
            <Logout/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      {isAuthenticated() ? 'Secured Content' : ''}
    </div>
  );
}

function Logout() {
  return (
    <div>
      {logout()}
      <Redirect to="/"/>
    </div>
  );
}
