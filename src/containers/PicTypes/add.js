import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import AddContactForm from '@components/Form/addContact'
import { CATEGORY_ADDPICTYPES } from '@constants/title'
import { Button, Icon } from 'native-base';
import firebase from 'react-native-firebase';
import uuid from 'uuid/v4';


class AddPicTypes extends Component {
  constructor(props) {
    super(props);
    props.navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_ADDPICTYPES })
    this.ref = firebase.firestore().collection('picTypes');
    this.imageRef = firebase.storage().ref('picTypes');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      isLoading: false
    }
    
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
  saveContact = async (data) => {
      this.setState({isLoading : true})
      if (!!data.picture) {
          this.imageRef.child(uuid()).put(data.picture)
          .then( ({downloadURL}) => {
            this.ref.add({ ...data, picture: downloadURL, user: this.uid }).then(() => {
              this.setState({isLoading : false},() => this.props.navigation.navigate('contacts'));
              
            })
          }) 
        }
        this.ref.add({ ...data, picture: "", user: this.uid }).then(() => {
          this.setState({isLoading : false}, () => this.props.navigation.navigate('contacts'));
        })
  }

  render() {
    return (
      <AddContactForm saveContact={this.saveContact} form={this.props.navigation.state.params.data} isLoading={this.state.isLoading}/>
    )
  }
}

export default withNavigation(AddPicTypes);