import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import  AuthContainer from '@containers/Auth/auth-container'
import { Login, Auth } from '@components/Auth'
import { Home } from '@components/Content'
  
const scenes = Actions.create(
  <Scene key='app'  hideNavBar>
    <Scene key='auth' component={ AuthContainer } title='Auth' selector={Auth}/>

    <Scene key='login' component={ AuthContainer } selector={ Login } title='Login'/>
    <Scene key='home' component={ Home }  title='Home'/>
  </Scene>
);

export default scenes;
