import React, { Component } from 'react';
import { AuthContent, ForgotPassword } from '@components/Auth'
import Background from '@components/Background'

class ForgotPasswordContainer extends Component {

  render() {
    return (
      <Background>

        <AuthContent>
          <ForgotPassword />
        </AuthContent>

      </Background>)
  }
}

export default ForgotPasswordContainer;
