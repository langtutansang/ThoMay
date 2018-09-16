import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import styles from './styles';

class Background extends Component {

  render() {
    const background = require('@thumbnails/background.png');
   
    return (

      <ImageBackground
        style={styles.main}
        source={background}
      >
       {this.props.children}
      </ImageBackground>
    )
  }
}
export default Background;