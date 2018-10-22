import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, Button, Icon, ActionSheet, ListItem, Left, Body, Thumbnail, SwipeRow, Content } from 'native-base';
import { withNavigation  } from 'react-navigation';
import { CANCEL_INDEX, DESTRUCTIVE_INDEX } from '@constants/other'
import { CATEGORY_CONTACTS } from '@constants/title'
import { NativeLargeList }from "react-native-largelist-v2";

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
      { text: 'Tạo mới', screen: () => this.props.navigation.navigate('addContacts',{ preRoute: 'list' }) },
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
      <Button transparent onPress={this.showMenuContact}>
        <Icon name='ios-contacts' />
      </Button>
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
    let dataContacts = [];
    let arrayChar = [...Array(26)].map((_, i) => (String.fromCharCode('A'.charCodeAt(0) + i)));
    let data =  [...Array(26)].map((_, i) => (
      {
        title:String.fromCharCode('A'.charCodeAt(0) + i), items : []
      } 
    ));
    data.push({title: "#", items: []})
    querySnapshot.forEach((e) => {
      let name = [e.data().firstName, e.data().lastName].filter(e => !!e).join(' ');
      let index = arrayChar.indexOf(name.charAt(0).toUpperCase())
      if( index === - 1) index = 26;
      data[index].items.push(
        {...e.data(), id: e.id, name}
      )   
    });
    
    data = data.filter(e => e.items.length > 0)
    this.setState({
      dataContacts: data
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe();

  }

  renderSectionItem = (section) => {
    let {dataContacts} = this.state
    let item = dataContacts[section]
    return (
      <ListItem itemDivider>
        <Text>{item.title}</Text>
      </ListItem> 
    )
  }
  renderIndexItem = ({section, row}) => {
    let {dataContacts} = this.state
    let item = dataContacts[section].items[row]
    let coreItem = this.renderCoreIndexItem(item);
    return(
      <ListItem
      button onPress={() => this.onPress(item.id)}
      noIndent
      >
      <Left style={{ flex: 1 }}>
        <Thumbnail square source={!!item.picture ? item.picture : require('@thumbnails/category/default-contact.png')} />
      </Left>
      <Body style={{ flex: 4 }}>
        <Text>{item.name}</Text>
        {item.phone.length > 0 && item.phone.map((ele, keyele) => <Text key={keyele} note>{ele.number}</Text>)}
      </Body>
    </ListItem>
    )
  }
  renderCoreIndexItem = (item) => (
    <ListItem
      button onPress={() => this.onPress(item.id)}
      noIndent
      >
      <Left style={{ flex: 1 }}>
        <Thumbnail square source={!!item.picture ? item.picture : require('@thumbnails/category/default-contact.png')} />
      </Left>
      <Body style={{ flex: 4 }}>
        <Text>{item.name}</Text>
        {item.phone.length > 0 && item.phone.map((ele, keyele) => <Text key={keyele} note>{ele.number}</Text>)}
      </Body>
    </ListItem>
  )
  render() {

    let { dataContacts } = this.state;

    return (
      dataContacts.length === 0 ? <Text>Đang lấy dữ liệu</Text> :
        <NativeLargeList
          data={dataContacts}
          heightForSection={() => 50}
          renderSection={this.renderSectionItem}
          heightForIndexPath={() => 80}
          renderIndexPath={this.renderIndexItem}
        />
    )
  }
}
export default withNavigation(List);