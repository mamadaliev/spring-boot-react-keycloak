import React from "react";
import {LoginForm} from "./LoginForm";
import { connect } from 'react-redux';

import { setAuthenticated } from '../../store/auth/actions'

export class LoginFromComponent extends React.Component {

  render() {
    return (
      <LoginForm {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = {
  setAuthenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFromComponent)
