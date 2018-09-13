import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import  Auth from '@containers/Auth/auth-container'
import { Home1 } from '@components/Home1'
  
const scenes = Actions.create(
  <Scene key='app'  hideNavBar>
    <Scene key='auth' component={ Auth } title='Auth' />
    <Scene key='home1' component={ Home1 } title='Home1' />
  </Scene>
);

export default scenes;
