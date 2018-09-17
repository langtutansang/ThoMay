import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

class Home extends Component {
  logout = () => {
    firebase.auth().signOut().then(
      ()=>{
        Actions.login();
      }
    );
    
  }
  render() {
    return (
      <View>
        <Text>sang</Text>
        <TouchableOpacity

        onPress={this.logout}>
        <Text>
          Đăng xuất
        </Text>
        </TouchableOpacity>

      </View>
    )
  }
}
export default Home;