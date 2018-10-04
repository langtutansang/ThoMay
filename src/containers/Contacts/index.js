import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, Button, Icon, ActionSheet } from 'native-base';
import { checkReadContact, requestReadContact } from '@components/Permission/contacts';
import { withNavigation  } from 'react-navigation';
import { CANCEL_INDEX, DESTRUCTIVE_INDEX } from '@constants/other'

class List extends Component {

  constructor(props) {
    super(props);
    let { uid } = firebase.auth().currentUser._user;
    let { left, right, navigation } = props;
    
    if (!left || !right) navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader() })
    this.ref = firebase.firestore().collection('contacts');

    this.state = {
      uid,
      dataContacts: []
    }
  }

  showMenuContact = () => {
    var BUTTONS = ['Tạo mới', 'Lấy từ danh bạ' ];

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Chọn từ"
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    )
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

  showContactDevice = () => {

    checkReadContact()
      .then(
        res => {
          if (res) this.showMenuContact()
          else
            requestReadContact()
              .then(res => {
                if (res) this.showMenuContact()
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
      this.setState({ contacts})
    })
  }

  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.props.navigation.);
    this.unsubscribe = this.ref.where('user', '==', this.state.uid).onSnapshot(this.onCollectionUpdate)
  }
  onCollectionUpdate = (querySnapshot) => {
    const dataContacts = [];
    querySnapshot.forEach((e) => {
      let { name } = e.data();
      dataContacts.push({
        name,
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
        <Button transparent onPress={this.showMenuContact}>
          <Icon name='arrow-back' />
        </Button>
        {dataContacts.map((e, key) => <Text key={key}>{e.name}</Text>)}
      </View>
    )
  }
}
export default withNavigation(List);