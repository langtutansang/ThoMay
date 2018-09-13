import React, {Component} from 'react';
import codePush from 'react-native-code-push';
import { View, Text } from 'react-native';

class App extends Component {
  constructor(){
    super()
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }
  render() {
    return (
        <Text>thử update</Text>
    );
  }
}

export default codePush(App);
