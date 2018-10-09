import React, { Component } from 'react';
import { List, ListItem, Left, Thumbnail, Body, Text, Button, Icon, Right } from 'native-base';
import { BackHandler, FlatList } from 'react-native';
import { LargeList } from "react-native-largelist-v2";

import { withNavigation } from 'react-navigation';
import Contacts from 'react-native-contacts';
import { CATEGORY_FROMCONTACTS } from '@constants/title'
import Item from '@components/ListItem'

class ListContact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataContacts: [],
      key: -1,
      data: []
    }
    let { left, right } = props;

    if (!left || !right) this.setParams()

  }

  setContact = (dataContacts) => {

    let arrayChar = [...Array(26)].map((_, i) => (String.fromCharCode('A'.charCodeAt(0) + i)));

    let data =  [...Array(26)].map((_, i) => (
      {
        title:String.fromCharCode('A'.charCodeAt(0) + i), items : []
      } 
    ));
    data.push({title: "#", items: []})
    dataContacts = dataContacts.forEach(e => {
      let givenName = [e.givenName, e.middleName, e.familyName].filter(e => !!e).join(' ');
      let index = arrayChar.indexOf(givenName.charAt(0).toUpperCase())
      if( index === - 1) index = 26;
      data[index].items.push( {
        givenName,
        id: e.recordID,
        thumbnailPath: e.thumbnailPath,
        phoneNumbers: e.phoneNumbers
      })
      
    })
    data = data.filter(e => e.items.length > 0)
    console.log(data);
    this.setState({ dataContacts: data })
  }

  setParams = () => {
    this.props.navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_FROMCONTACTS })
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }

  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  renderRightHeader = () => {
    return (this.state.key !== -1 ?
      <Button transparent onPress={this.setBack}>
        <Icon name='ios-checkmark-outline' style={{ fontSize: 40 }} />
      </Button> :
      <Text>
      </Text>
    )
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);

    Contacts.getContactsMatchingString("", (err, dataContacts) => {
      if (err) throw err;
      this.setContact(dataContacts)
    })
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.key !== this.state.key && this.state.key !== -1) this.setParams()
  // }
  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toLowerCase() + s.slice(1)
  }

  onPress = (key) => {
    this.setState({ key });
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
    return(
    <ListItem
    button onPress={() => this.onPress(item.id)}
    noIndent
    style={{ backgroundColor: item.id === this.state.key ? "#cde1f9" : '#fff' }}>
    <Left style={{ flex: 1 }}>
      <Thumbnail square source={!!item.thumbnailPath ? { uri: item.thumbnailPath } : require('@thumbnails/category/default-contact.png')} />
    </Left>
    <Body style={{ flex: 4 }}>
      <Text>{item.givenName}</Text>
      {item.phoneNumbers.length > 0 && item.phoneNumbers.map((ele, keyele) => <Text key={keyele} note>{ele.number}</Text>)}
    </Body>
  </ListItem>)
  }
  render() {
    let { dataContacts } = this.state;
    return (
        dataContacts.length === 0 ? <Text>Đang lấy dữ liệu</Text> :
        <LargeList
          data={dataContacts}
          heightForSection={() => 50}
          renderSection={this.renderSectionItem}
          heightForIndexPath={() => 80}
          renderIndexPath={this.renderIndexItem}
        />

    )
  }
}

// export default (ListContact);
export default withNavigation(ListContact);

