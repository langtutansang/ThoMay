import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';

import styles from './styles';
import navigateReset from '@components/Navigate';

class ForgotPassword extends Component {
  state = {
    email: "langtutansang@gmail.com",
    isForgot: false
  }

  navigateLogin = () => {
    navigateReset(this.props.navigation, 'login')
  }


  forgotPassword = () => {
    let { email} = this.state;
    let self = this;
    self.setState({ isForgot: true })

    firebase.auth().sendPasswordResetEmail(email)
      .then(function(){
        ToastAndroid.showWithGravity(
          'Gửi mail thành công, kiểm tra email để khôi phục tài khoản',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        self.setState({ isForgot: false },  self.navigateLogin)
      })
      .catch(function (error) {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        self.setState({ isForgot: false })
      });
  }
  render() {
    let { isForgot }  = this.state;
    let { navigation : { navigate }}  = this.props;

    return (
      <View pointerEvents={ isForgot ? "none" : "auto"}>
        <View style={styles.formInput}>
          <Icon name="envelope" style={styles.icon} size={20} />
          <TextInput
            placeholder="Email Recieve"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            style={styles.input}
            underlineColorAndroid="black"
          />
        </View>

        <View style={styles.formButton}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.forgotPassword}>
            <Text style={styles.loginText}>{ isForgot ? <Icon name="spinner" style={styles.icon} size={20} /> : null} { isForgot ? " Đang gửi Email" : "Gửi Email"}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.touchableOpacity}>
          <TouchableOpacity
            onPress={() => navigate('login') }>
            <Text>
              {'Đăng nhập'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('register') }>
            <Text>
              {'Đăng ký ?'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
export default ForgotPassword;