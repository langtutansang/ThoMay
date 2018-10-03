import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

import { Button, Text, View } from 'native-base';
import firebase from 'react-native-firebase';

import Contacts from 'react-native-contacts';
import { checkReadContact, requestReadContact} from '@components/Permission/contacts';
class Dashboard extends Component {
  
  logout = () => {
    firebase.auth().signOut().then(
      ()=>{
        const loginAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'login' })],
        });
        this.props.navigation.dispatch(loginAction);
        
      }
    );
  }

  render() {

    return (
      <View>
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
export default Dashboard;