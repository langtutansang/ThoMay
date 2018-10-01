import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import {View, Text } from 'native-base';

class List extends Component {

  constructor(props) {
    super(props);
    let {uid} = firebase.auth().currentUser._user;

    this.ref = firebase.firestore().collection('contacts');
    this.state = {
      uid,
      dataContacts: []
    }
  }

  setBack = () => {
    Actions.list({type:ActionConst.REPLACE })
  }
  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.setBack );
    this.unsubscribe = this.ref.where('user', '==', this.state.uid).onSnapshot(this.onCollectionUpdate) 

  }
  onCollectionUpdate = ( querySnapshot ) => {
    const dataContacts = [];
    querySnapshot.forEach((e) => {
      let { name } = e.data();
      dataContacts.push({
        name, // DocumentSnapshot
      });
    });
    this.setState({ 
      dataContacts
  });
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.setBack);
      this.unsubscribe();

  }
  render() {
    let { dataContacts } = this.state;
    return (
      <View>
        {dataContacts.map((e,key) => <Text key={key}>{e.name}</Text>)}       
      </View>
    )
  }
}
export default List;