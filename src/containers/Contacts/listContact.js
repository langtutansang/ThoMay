import React, { Component } from 'react';
import { View, List, ListItem, Left, Thumbnail, Body, Text, Button, Icon } from 'native-base';
import { BackHandler } from 'react-native';

import { withNavigation } from 'react-navigation';
import Contacts from 'react-native-contacts';
import { CATEGORY_FROMCONTACTS } from '@constants/title'


class ListContact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataContacts: []
    }
    let { left, right, navigation } = props;

    if (!left) navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_FROMCONTACTS })
    Contacts.getContactsMatchingString("",(err, dataContacts) => {
      if (err) throw err;
      console.log(dataContacts)
      this.setState({ dataContacts })
    })
  }

  setBack = () => {
    this.props.navigation.navigate('contacts')
  }
  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }
  renderRightHeader = () => {
    return (
      <Text>
      </Text>
    )
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.setBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  render() {

    let { dataContacts } = this.state;
    let arrayChar = [...Array(26)].map((_, i) => ({ givenName:String.fromCharCode('A'.charCodeAt(0) + i), divider:true }) );
    let data = [...dataContacts, ...arrayChar, { givenName: '#', divider:true}]
    data.sort((a, b) => a.givenName.localeCompare(b.givenName))
    data = data.length===27 ? data :  data.filter( (e,key) => !( (!!data[key+1] && !!e.divider && data[key+1].divider ) || (key === data.length &&  !!e.divider) )  )
    return (
      <View>
        {data.map((e, key) => {
          // let name = `${e.givenName ? e.givenName: ''}${e.middleName? ' ' + e.middleName: '' }${e.familyName?' ' + e.familyName : ''} `
          let name = [e.givenName, e.middleName, e.familyName].filter(e => !!e).join(' ')
          return (
            <List key={key}>
              { !!e.divider ? <ListItem itemDivider>
              <Text>{e.givenName}</Text>
            </ListItem>               :
              <ListItem button onPress={() => { }}> 
                <Left>
                  <Thumbnail square source={!!e.thumbnailPath ? {uri: e.thumbnailPath}: require('@thumbnails/category/default-contact.png') } />
                  <Body>
                    <Text>{name}</Text>
                    {e.phoneNumbers.length>0 && e.phoneNumbers.map( (ele, keyele) => <Text key={keyele} note>{ele.number}</Text> ) }
                  </Body>
                </Left>
              </ListItem>}
            </List>
          )}
        )}

      </View>
    )
  }
}

export default withNavigation(ListContact);

