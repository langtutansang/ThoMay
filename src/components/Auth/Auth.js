import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';


const logo = require('@thumbnails/logo.png');
const title = require('@thumbnails/title.png');

class Auth extends Component {

  render(){
    return(   
      <View style={styles.main}>
        <Image 
          style={styles.img}
          source={logo}
        />
        <Button 
          color="green"
          title="Đăng nhập tài khoản"  
        />
        <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={()=>{}}>
             <Text>
               {'Sử dụng nội bộ'}
             </Text>
          </TouchableOpacity>
      </View>     
    )
  }
}
export default Auth;