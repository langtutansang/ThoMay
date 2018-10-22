import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import AddContactForm from '@components/Form/addContact'
import { CATEGORY_ADDCONTACTS } from '@constants/title'
import { Button, Icon } from 'native-base';
import firebase from 'react-native-firebase';

class AddContact extends Component {
  constructor(props){
    super(props);
    props.navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_ADDCONTACTS })
    let { uid } = firebase.auth().currentUser._user;
    this.ref = firebase.firestore().collection('contacts');
    this.uid = uid;
  }
  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }
  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }
  saveContact = (data) => {
    this.ref.add({...data, user: this.uid})
      .then( () => this.props.navigation.navigate('contacts') )
  }
  render(){
    return(

      <AddContactForm saveContact={this.saveContact}/>
    )
  }
}

export default withNavigation(AddContact);