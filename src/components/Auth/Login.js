import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions, withNavigation  } from 'react-navigation';

import Divider from '@components/Divider'

import styles from './styles';

class Login extends Component {
  state = {
    email: "langtutansang@gmail.com",
    password: "Ltts11021996",
    isLogin: false,
    isLoginAnonymous: false
  }

  navigaHome = () => {
    const action = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'home' })],
    });
    this.props.navigation.dispatch(action)
  }
  login = () => {
    let { email, password } = this.state;
    let self = this;

    self.setState({ isLogin: true })
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(function(){   
        self.setState({ isLogin: false }, self.navigaHome
        )
       
      })
      .catch(function (error) {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        self.setState({ isLogin: false })
      });
  }

  loginAnonymous = () =>{
    let self = this;

    self.setState({ isLoginAnonymous: true })
    firebase.auth().signInAnonymouslyAndRetrieveData()
    .then(function(){
      self.setState({ isLoginAnonymous: false }, 
        self.navigaHome
      )
    })
    .catch(function(error){
      ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      self.setState({ isLoginAnonymous: false })
    })
  }
  
  render() {
    let { isLogin, isLoginAnonymous }  = this.state;

    return (
      <View pointerEvents={ isLogin ? "none" : "auto"}>
        <View style={styles.formInput}>
          <Icon name="envelope" style={styles.icon} size={20} />
          <TextInput
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            style={styles.input}
            underlineColorAndroid="black"
          />
        </View>
        <View style={styles.formInput}>
          <Icon name="lock" style={styles.icon} size={20} />
          <TextInput
            placeholder="Mật khẩu"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            style={styles.input}
            underlineColorAndroid="black"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.formButton}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.login}>
            <Text style={styles.loginText}>{ isLogin ? <Icon name="spinner" style={styles.icon} size={20} /> : null} { isLogin ? " Đang đăng nhập" : "Đăng nhập"}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.touchableOpacity}>
          <TouchableOpacity

            onPress={() =>{}
            //  Actions.register()
             }>
            <Text>
              {'Đăng ký'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}
            //  Actions.forgotPassword()
             }>
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
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton, styles.ignoreLogin]} onPress={this.loginAnonymous}>
              <Text style={styles.loginText}>{ isLoginAnonymous ? <Icon name="spinner" style={styles.icon} size={20} /> : null} { isLoginAnonymous ?" Đang đăng nhập" : "Bỏ qua đăng nhập"}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}
export default withNavigation(Login);