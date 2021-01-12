import React from "react";

import {Redirect} from "react-router";
import {isAuthenticated, login} from "../../service/AuthService";

export class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {login: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      login: event.target.login,
      password: event.target.password
    });
  }

  handleSubmit(event) {
    // if (login(event.target.login.value, event.target.password.value)) {
    //   return <Redirect to={'/'}/>
    // }
    console.log(login(event.target.login.value, event.target.password.value))
    event.preventDefault();
  }

  render() {

    if (isAuthenticated()) {
      return <Redirect to={'/'}/>
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <input id={'login'} type={'text'} placeholder={'Login'}/>
          <input id={'password'} type={'password'} placeholder={'Password'}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}
