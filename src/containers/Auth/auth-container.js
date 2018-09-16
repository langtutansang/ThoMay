import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AuthContent, Login } from '@components/Auth'
import Background from '@components/Background'

import styles from './styles'
import firebase from 'react-native-firebase';

class Auth extends Component{
  state = {
    loading: true
  }

  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        Actions.home();
      } else {      
        self.setState({ loading: false })
      }
    });
  }
  render(){
    let { loading } = this.state
    return(
      <Background>
        { loading ?
          <View style={styles.indicator}><ActivityIndicator size="large" color="#0000ff" /></View>  : 
          <AuthContent>
            <Login/>
          </AuthContent> 
        }
      </Background> )
  }
}

export default Auth;
