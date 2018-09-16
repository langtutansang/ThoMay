import React, {Component} from 'react';
// import codePush from 'react-native-code-push';
import { View } from 'react-native';

import scenes from '@scenes';
import {Router} from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

class App extends Component {
  render() {

    const store = configureStore();
    return (
        <Provider store={store}>
            <Router scenes={scenes}/>
        </Provider>

    );
  }
}
// export default codePush(App);
export default (App);
