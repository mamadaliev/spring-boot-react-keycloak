import React from "react";

import {Redirect} from "react-router";
import {login} from "../../service/AuthService";

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

  onLoginChange = (event) => {
    this.props.setAuthLogin(event.target.value)
  }

  onPasswordChange = (event) => {
    this.props.setAuthPassword(event.target.value)
  }

  handleSubmit(event) {
    login(this.props.login, this.props.password).then(r => {
      this.props.setAuthStatus(true)
    })
    event.preventDefault();
  }

  render() {

    if (this.props.isLogged) {
      return <Redirect to={'/'}/>
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <input
            id={'login'}
            type={'text'}
            value={this.props.login}
            onChange={this.onLoginChange}
            placeholder={'Login'}/>
          <input
            id={'password'}
            type={'password'}
            value={this.props.password}
            onChange={this.onPasswordChange}
            placeholder={'Password'}/>
          <input
            type="submit"
            value="Login"/>
        </form>
      </div>
    );
  }
}
