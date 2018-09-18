import React, { Component } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Background from '@components/Background'

import firebase from 'react-native-firebase';
import styles from './styles';

class AuthContainer extends Component {
  unsubscriber = null;
  componentDidMount(){
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (!user) Actions.login({type: 'reset'});
      if (user) Actions.home({type: 'reset'});
      this.unsubscriber();
    });
  }

  render() {
    return (
      <Background>
        <View style={styles.indicator}><ActivityIndicator size="large" color="#0000ff" /></View>
      </Background>)
  }
}

export default AuthContainer;
