import {login} from "../service/AuthService";
import React from "react";

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
    console.log('e: ' + event)
    console.log('s: ' + this.state)
    console.log(event.target.login.value)
    console.log(event.target.password.value)
    login(event.target.login.value, event.target.password.value)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <input id={'login'} type={'text'} placeholder={'Login'}  />
        <input id={'password'} type={'password'} placeholder={'Password'}  />
        <input type="submit" value="Login" />
      </form>
    );
  }
}
