import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import  Auth from '@containers/Auth/auth-container'
import  LoginContainer from '@containers/Auth/login-container'
import  RegisterContainer from '@containers/Auth/register-container'
import  ForgotPasswordContainer from '@containers/Auth/forgot-password-container'
import { Home } from '@components/Content'
import firebase from 'react-native-firebase';

redirect = () => {
  let user = firebase.auth().currentUser;
    
  if (user) {
    Actions.login({ type: 'reset' });
  } 
  else {
    Actions.login({ type: 'reset' });
  }
}
const scenes = Actions.create(
  <Scene key='app'  hideNavBar>
    <Scene key='auth' component={ Auth } title='Auth' onEnter={redirect}/>
    <Scene key='login' component={ LoginContainer } title='Login'/>
    <Scene key='register' component={ RegisterContainer }  title='Register'/>
    <Scene key='forgotPassword' component={ ForgotPasswordContainer }  title='ForgotPassword'/>
    <Scene key='home' component={ Home }  title='Home'/>

  </Scene>
);

export default scenes;
