import React, { Component } from 'react';
import { AuthContent, Register } from '@components/Auth'
import Background from '@components/Background'

class RegisterContainer extends Component {

  render() {
    return (
      <Background>

        <AuthContent>
          <Register />
        </AuthContent>

      </Background>)
  }
}

export default RegisterContainer;
