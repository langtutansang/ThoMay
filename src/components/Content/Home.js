import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from '@components/Firebase'
import { Actions } from 'react-native-router-flux';


class Home extends Component {
  logout = () => {
    firebase.auth().signOut().then(
      ()=>{
        Actions.auth();
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