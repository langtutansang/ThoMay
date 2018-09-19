import React from 'react';
import { Actions, Scene, Stack } from 'react-native-router-flux';
import Auth from '@containers/Auth/auth-container'
import LoginContainer from '@containers/Auth/login-container'
import RegisterContainer from '@containers/Auth/register-container'
import ForgotPasswordContainer from '@containers/Auth/forgot-password-container'
import Content from '@components/Content'
import Home from '@containers/Home'
import List from '@containers/List'

const scenes = Actions.create(
  <Stack key="root" hideNavBar>
      <Scene key='auth' component={Auth} title='Auth' initial />
      <Scene key='login' component={LoginContainer} title='Login' />
      <Scene key='register' component={RegisterContainer} title='Register' />
      <Scene key='forgotPassword' component={ForgotPasswordContainer} title='ForgotPassword' />
      <Scene key="home" title="Home" component={ Content } contentChild={ Home }/>
      <Scene key="list" title="List" component={ Content } contentChild={ List }/>
  </Stack>

);

export default scenes;
