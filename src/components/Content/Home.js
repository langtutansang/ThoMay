import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import Contacts from 'react-native-contacts';
import { checkReadContact, requestReadContact} from '@components/Permission/contacts';
class Home extends Component {
  state = {
    permission:{
      read_contact: false
    }
  }
  logout = () => {
    firebase.auth().signOut().then(
      ()=>{
        Actions.login();
      }
    );
    
  }

  componentDidMount(){
    checkReadContact()
    .then(
      res => {
        if(res)  this.setState({permission: {read_contact: res } }) 
        else
          requestReadContact()
            .then( res =>  this.setState({permission: {read_contact: res } }) )
            .catch(err => console.log(err))
      }
    )
    .catch(
      err => console.log(err)
    )

    // Contacts.getAll((err, contacts) => {
    //   if (err) throw err;
    
    //   // contacts matching "filter"
    //   console.log(contacts)
    // })
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