import React, { Component } from 'react';
import { Text, TextInput, View, ImageBackground, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import styles from './styles';
import firebase from '@components/Firebase'
import { Login } from '@components/Auth'
const logo = require('@thumbnails/logo2.png');
const background = require('@thumbnails/background.png');

class Auth extends Component {
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
  render() {
    let { loading } = this.state
    return (

      <ImageBackground
        style={styles.main}
        source={background}
      >
        { loading ?<View style={styles.indicator}><ActivityIndicator size="large" color="#0000ff" /></View>  :
        <View>
          <Animatable.Image
            animation="fadeInDown"
            style={styles.img}
            source={logo}
            resizeMode="contain"
          />
          <Animatable.View
            animation="fadeInUp">
            <Login/>
          </Animatable.View>
        </View>
        }
      </ImageBackground>
    )
  }
}
export default Auth;