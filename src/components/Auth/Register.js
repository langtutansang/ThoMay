import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import Divider from '@components/Divider'

import styles from './styles';

class Register extends Component {
  state = {
    email: "langtutansang@gmail.com",
    password: "admin123",
    repassword: "admin123",
    isRegister: false
  }

  navigaHome = () => {
    const action = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'home' })],
    });
    this.props.navigation.dispatch(action)
  }

  register = () => {
    let { email, password, repassword } = this.state;
    let self = this;
    self.setState({ isRegister: true })

    if( password !== repassword ){
      ToastAndroid.showWithGravity(
        "Mật khẩu không khớp",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      self.setState({ isRegister: false })
      return;
    }
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(function(){
        self.setState({ isRegister: false }, self.navigaHome)
      })
      .catch(function (error) {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        self.setState({ isRegister: false })
      });
  }
  render() {
    let { isRegister }  = this.state;
    let { navigation : { navigate }}  = this.props;
    return (
      <View pointerEvents={ isRegister ? "none" : "auto"}>
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
        <View style={styles.formInput}>
          <Icon name="clone" style={styles.icon} size={20} />
          <TextInput
            placeholder="Nhập lại Mật khẩu"
            onChangeText={(text) => this.setState({ repassword: text })}
            value={this.state.repassword}
            style={styles.input}
            underlineColorAndroid="black"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.formButton}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.register}>
            <Text style={styles.loginText}>{ isRegister ? <Icon name="spinner" style={styles.icon} size={20} /> : null} { isRegister ? " Đang đăng ký" : "Đăng ký"}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.touchableOpacity}>
          <TouchableOpacity

            onPress={() => navigate('login')
             }>
            <Text>
              {'Đăng nhập'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('forgotPassword')
             }>
            <Text>
              {'Quên mật khẩu ?'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
export default Register;