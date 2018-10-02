import React, { Component } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import Background from '@components/Background'

import firebase from 'react-native-firebase';
import styles from './styles';

class AuthContainer extends Component {
  unsubscriber = null;
  componentDidMount(){
    let { navigation } = this.props;
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (!user)  navigation.navigate('login')
      if (user)navigation.navigate('home');
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
