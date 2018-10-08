import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, Button, Icon, ActionSheet } from 'native-base';
import { checkReadContact, requestReadContact } from '@components/Permission/contacts';
import { withNavigation  } from 'react-navigation';
import { CANCEL_INDEX, DESTRUCTIVE_INDEX } from '@constants/other'
import { CATEGORY_CONTACTS } from '@constants/title'

class List extends Component {

  constructor(props) {
    super(props);
    let { uid } = firebase.auth().currentUser._user;
    let { left, right, navigation } = props;
    
    if (!left || !right) navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_CONTACTS })
    this.ref = firebase.firestore().collection('contacts');

    this.state = {
      uid,
      dataContacts: []
    }
  }

  showMenuContact = () => {
    var BUTTONS = [
      { text: 'Tạo mới', screen: () => this.props.navigation.navigate('insertContact',{ preRoute: 'list' }) },
      { text: 'Lấy từ danh bạ', screen: () => this.props.navigation.navigate('listContacts',{ preRoute: 'list' })} 
    ];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Chọn từ"
      },
      key =>{
        if( !!BUTTONS[key]) BUTTONS[key].screen()
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
      </Button>
    )
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
  setBack = () => {
    this.props.navigation.navigate('list')
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.setBack);
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