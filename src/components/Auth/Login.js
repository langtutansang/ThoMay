import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '@components/Firebase'

import Divider from '@components/Divider'

import styles from './styles';

class Auth extends Component {
  state = {
    email: "",
    password: "",
    isLogin: false
  }

  login = () => {
    let { email, password } = this.state;
    let self = this;

    self.setState({ isLogin: true })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        self.setState({ isLogin: false })

      });
  }

  render() {
    let { isLogin }  = this.state;
    return (
      <View pointerEvents={ isLogin ? "none" : "auto"}>
        <View style={styles.formInput}>
          <Icon name="phone" style={styles.icon} size={20} />
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
            <Text style={styles.loginText}>{ isLogin ? "Đang đăng nhập" : "Đăng nhập"}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.touchableOpacity}>
          <TouchableOpacity

            onPress={this.login}>
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
      </View>
    )
  }
}
export default Auth;