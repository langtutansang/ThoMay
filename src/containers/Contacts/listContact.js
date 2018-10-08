import React, { Component } from 'react';
import { List, ListItem, Left, Thumbnail, Body, Text, Button, Icon, Right } from 'native-base';
import { BackHandler, FlatList, View } from 'react-native';

import { withNavigation } from 'react-navigation';
import Contacts from 'react-native-contacts';
import { CATEGORY_FROMCONTACTS } from '@constants/title'

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

    dataContacts = dataContacts.map(e => {
      let givenName = [e.givenName, e.middleName, e.familyName].filter(e => !!e).join(' ')
      return {
        givenName,
        id: e.recordID,
        thumbnailPath: e.thumbnailPath,
        phoneNumbers: e.phoneNumbers
      }
    })

    let arrayChar = [...Array(26)].map((_, i) => ({ id: 'divider' + i, givenName: String.fromCharCode('A'.charCodeAt(0) + i), divider: true }));
    let data = [...dataContacts, ...arrayChar, { id: 'divider#', givenName: '#', divider: true }]
    data.sort((a, b) => this.capitalize(a.givenName).localeCompare(this.capitalize(b.givenName)))
    data = data.length === 27 ? data : data.filter((e, key) => !((!!data[key + 1] && !!e.divider && data[key + 1].divider) || (key === (data.length - 1) && !!e.divider)))
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
  
  renderItem = ({ item }) => {
    return (!!item.divider ?
      <ListItem itemDivider >
        <Text>{item.givenName}</Text>
      </ListItem> :
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
      </ListItem>

    )
  }
  render() {
    let { dataContacts } = this.state;
    return (
      <List>
        {dataContacts.map((item) => {
            return (!!item.divider ?
              <ListItem itemDivider key={item.id}>
                <Text>{item.givenName}</Text>
              </ListItem> :
              <ListItem
                key={item.id}
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
              </ListItem>
            )
          }
          )}
      </List>
    )
  }
}

// export default (ListContact);
export default withNavigation(ListContact);

