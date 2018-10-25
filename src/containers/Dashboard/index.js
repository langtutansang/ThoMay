import React, { Component } from 'react';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';

import { Button, Text, View } from 'native-base';
import firebase from 'react-native-firebase';
import { BackHandler } from 'react-native';

class Dashboard extends Component {
  setBack = () => {
    return true
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
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
export default withNavigation(Dashboard);