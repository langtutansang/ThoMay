import React, { Component } from 'react';
import { AuthContent, Login } from '@components/Auth'
import Background from '@components/Background'

class LoginContainer extends Component {

  render() {
    return (
      <Background>

        <AuthContent>
          <Login />
        </AuthContent>

      </Background>)
  }
}

export default LoginContainer;
