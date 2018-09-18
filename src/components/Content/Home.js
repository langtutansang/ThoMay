import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import Contacts from 'react-native-contacts';
import { checkReadContact, requestReadContact} from '@components/Permission/contacts';
class Home extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('contact');
  }

  state = {
    contacts:[]
  }
  logout = () => {
    firebase.auth().signOut().then(
      ()=>{
        Actions.login({type: 'reset'});
      }
    );
    
  }

  componentDidMount(){
    checkReadContact()
    .then(
      res => {

        if(res) this.getContact()
        else
          requestReadContact()
            .then( res =>  {
              if(res) this.getContact()
          })
            .catch(err => console.log(err))
      }
    )
    .catch(
      err => console.log(err)
    )
  }
  pushData =() =>{
  

      this.ref.add({
        name: 'samg'
      });
  }
  getContact = () => {

    Contacts.getAll((err, contacts) => {

      if (err) throw err;
      console.log(contacts)
     
      this.setState({contacts})
    })
  }
  render() {
    let { contacts } =this.state
    console.log(contacts)
    return (
      <View>
        <TouchableOpacity

        onPress={this.logout}>
        <Text>
          Đăng xuất
        </Text>
        </TouchableOpacity>
        <TouchableOpacity

        onPress={this.pushData}>
        <Text>
          push dataa
        </Text>
        </TouchableOpacity>
        { contacts.map( (e,key) =>(
          <Text key={key}>{e.givenName}</Text>
        )) }
      </View>
    )
  }
}
export default Home;