import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import AddContactForm from '@components/Form/addContact'
import { CATEGORY_ADDCONTACTS } from '@constants/title'
import { Button, Icon } from 'native-base';
import firebase from 'react-native-firebase';
import uuid from 'uuid/v4';

class AddContact extends Component {
  constructor(props) {
    super(props);
    props.navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_ADDCONTACTS })
    this.ref = firebase.firestore().collection('contacts');
    this.imageRef = firebase.storage().ref('contacts');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      isLoading: false,
      percent: 0
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
  saveContact = (data) => {
    this.setState({ isLoading: true })
    if (!!data.picture) {
      let unsubscribe = this.imageRef.child(uuid()).putFile(data.picture).on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          console.log(
            snapshot
          )
          this.setState({ percent: snapshot.bytesTransferred / snapshot.totalBytes })
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            unsubscribe();
            this.ref.add({ ...data, picture: snapshot.downloadURL, user: this.uid }).then(() => {
              this.setState({ isLoading: false, percent: 0 }, () => {
                this.props.navigation.navigate('contacts');
              });
            })
          }
        },
        (error) => {
          unsubscribe();
        }
      )
    }

    else this.ref.add({ ...data, picture: "", user: this.uid }).then(() => {
      this.setState({ isLoading: false }, () => this.props.navigation.navigate('contacts'));
    })
  }

  render() {
    let { percent, isLoading } = this.state;
    return (
      <AddContactForm
        saveContact={this.saveContact}
        form={this.props.navigation.state.params.data}
        isLoading={isLoading}
        percent={percent}
      />
    )
  }
}

export default withNavigation(AddContact);