import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';
import styles from './styles';
const logo = require('@thumbnails/logo2.png');

class AuthContent extends Component {

  render() {
    return (
    <View>
      <Animatable.Image
        animation="fadeInDown"
        style={styles.img}
        source={logo}
        resizeMode="contain"
      />
      <Animatable.View
        animation="fadeInUp">
        {this.props.children}
      </Animatable.View>    
    </View>

    )
  }
}
export default AuthContent;