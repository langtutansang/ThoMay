import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, Button, Icon } from 'native-base';
import PopupDialog from 'react-native-popup-dialog';
import { checkReadContact, requestReadContact } from '@components/Permission/contacts';

class List extends Component {

  constructor(props) {
    super(props);
    let { uid } = firebase.auth().currentUser._user;

    this.ref = firebase.firestore().collection('contacts');

    this.state = {
      uid,
      dataContacts: []
    }
    // if (!props.left || !props.right) Actions.contacts({ left: this.renderLeftHeader(), right: this.renderRightHeader() })
  }
  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  renderRightHeader = () => {
    return (
      <Button transparent onPress={this.showContactDevice}>
        <Icon name='ios-contacts' />
      </Button>)
  }
  setBack = () => {
    Actions.list({ type: ActionConst.REPLACE })
  }

  showContactDevice = () => {

    checkReadContact()
      .then(
        res => {
          if (res) this.getContact()
          else
            requestReadContact()
              .then(res => {
                if (res) this.getContact()
              })
              .catch(err => console.log(err))
        }
      )
      .catch(
        err => console.log(err)
      )
  }


  getContact = () => {
   
    Contacts.getAll((err, contacts) => {

      if (err) throw err;
      console.log(contacts)
      this.setState({ contacts})
      this.popupDialog.show();

    })
  }

  componentDidMount() {
    this.popupDialog.show();
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe = this.ref.where('user', '==', this.state.uid).onSnapshot(this.onCollectionUpdate)

  }
  onCollectionUpdate = (querySnapshot) => {
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
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
          <View>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </View>
        </PopupDialog>
        {dataContacts.map((e, key) => <Text key={key}>{e.name}</Text>)}
      </View>
    )
  }
}
export default List;