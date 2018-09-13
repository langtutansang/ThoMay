import React, {Component} from 'react';
import codePush from 'react-native-code-push';
import scenes from '@scenes';
import {Router} from 'react-native-router-flux';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

class App extends Component {
  render() {
    const getSceneStyle = () => ({
      flex: 1,
      backgroundColor: '#fff',
      shadowColor: 'black',
      shadowOffset: {
        width: 2,
        height: 4
      },
      shadowOpacity: 0.5,
      shadowRadius: 3
    });

    const store = configureStore();
    return (
      <Provider store={store}>
        <Router scenes={scenes}  getSceneStyle={getSceneStyle}/>
      </Provider>
    );
  }
}

export default codePush(App);
