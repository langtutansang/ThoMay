import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import  Auth from '@containers/Auth/auth-container'
import { Home } from '@components/Content'
  
const scenes = Actions.create(
  <Scene key='app'  hideNavBar>
    <Scene key='login' component={ Auth } title='Auth'/>
    <Scene key='home' component={ Home }  title='Home'/>
  </Scene>
);

export default scenes;
