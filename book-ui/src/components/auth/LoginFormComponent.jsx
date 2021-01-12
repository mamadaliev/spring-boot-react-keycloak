import React from "react";
import {LoginForm} from "./LoginForm";
import {connect} from 'react-redux';

import {setAuthStatus, setAuthLogin, setAuthPassword} from '../../store/auth/actions'

export class LoginFromComponent extends React.Component {

  render() {
    return (
      <LoginForm {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    login: state.auth.login,
    password: state.auth.password
  }
}

const mapDispatchToProps = {
  setAuthStatus,
  setAuthLogin,
  setAuthPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFromComponent)
