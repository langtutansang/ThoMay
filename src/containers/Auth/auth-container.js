import React, { Component } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import Background from '@components/Background'

import firebase from 'react-native-firebase';
import styles from './styles';

import { StackActions, NavigationActions } from 'react-navigation';

class AuthContainer extends Component {
  unsubscriber = null;

  componentDidMount(){
    let { navigation } = this.props;
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {

      const action = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: (!user ? 'login' : 'home')  })],
        
      });
      this.props.navigation.dispatch(action);
    });
  }
  componentWillUnmount(){
    this.unsubscriber();
  }
  render() {
    return (
      <Background>
        <View style={styles.indicator}><ActivityIndicator size="large" color="#0000ff" /></View>
      </Background>)
  }
}

export default AuthContainer;
