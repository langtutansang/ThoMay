import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ImageBackground, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import Divider from '@components/Divider'
import styles from './styles';


const logo = require('@thumbnails/logo2.png');
const background = require('@thumbnails/background.png');

class Auth extends Component {
  render() {
    return (

      <ImageBackground
        style={styles.main}
        source={background}
      >
        <Animatable.Image
          animation="fadeInDown"
          style={styles.img}
          source={logo}
          resizeMode="contain"
        />
        <Animatable.View
          animation="fadeInUp">
          <View style={styles.formInput}>
            <Icon name="phone" style={styles.icon} size={20} />
            <TextInput
              placeholder="Số điện thoại"
              style={styles.input}
              underlineColorAndroid="black"
            />
          </View>
          <View style={styles.formInput}>
            <Icon name="lock" style={styles.icon} size={20} />
            <TextInput
              placeholder="Mật khẩu"
              style={styles.input}
              underlineColorAndroid="black"
              secureTextEntry={ true }
            />
          </View>
          <View style={styles.formButton}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => Actions.login()}>
            <Text style={styles.loginText}>Đăng nhập</Text>
          </TouchableHighlight>
          </View>
          <View style={styles.touchableOpacity}>
            <TouchableOpacity
  
              onPress={() => { }}>
              <Text>
                {'Đăng ký'}
              </Text>
            </TouchableOpacity>
                
            <TouchableOpacity
              onPress={() => { }}>
              <Text>
                {'Quên mật khẩu ?'}
              </Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.formButton}>
            <View style={styles.divider}>
              <Divider borderColor="#000" color="#000" orientation="center">
                Hoặc
              </Divider>
              
            </View>
          </View>
          <View style={styles.formButton}>
            <View style={styles.divider}>
              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton, styles.ignoreLogin]} onPress={() => Actions.login()}>
                <Text style={styles.loginText}>Bỏ qua đăng nhập</Text>
              </TouchableHighlight>
            </View>
          </View>
        
          
        </Animatable.View>

      </ImageBackground>
    )
  }
}
export default Auth;