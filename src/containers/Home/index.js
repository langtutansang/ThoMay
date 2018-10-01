import React, { Component } from 'react';

import { Button, Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import Contacts from 'react-native-contacts';
import { checkReadContact, requestReadContact} from '@components/Permission/contacts';
class Home extends Component {
  // constructor() {
  //   super();
  //   this.ref = firebase.firestore().collection('contact');
  // }

  // state = {
  //   contacts:[]
  // }
  
  logout = () => {
    firebase.auth().signOut().then(
      ()=>{
        Actions.login({type: 'reset'});
      }
    );
  }

  // componentDidMount(){
  //   checkReadContact()
  //   .then(
  //     res => {
  //       if(res) this.getContact()
  //       else
  //         requestReadContact()
  //           .then( res =>  {
  //             if(res) this.getContact()
  //         })
  //           .catch(err => console.log(err))
  //     }
  //   )
  //   .catch(
  //     err => console.log(err)
  //   )
  // }
  // pushData =() =>{
  

  //     this.ref.add({
  //       name: 'samg'
  //     });
  // }
  // getContact = () => {

  //   Contacts.getAll((err, contacts) => {

  //     if (err) throw err;
  //     console.log(contacts)
     
  //     this.setState({contacts})
  //   })
  // }
  render() {

    return (
      <View>
        <Button 
          info
          onPress= {() => Actions.drawer()}
        >
      
              <Text> Primary </Text>
            </Button>
            <Button 
          info
          onPress= {this.logout}
        >
      
              <Text> Logout </Text>
            </Button>
      </View>
    )
  }
}
export default Home;