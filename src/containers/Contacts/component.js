import React, { Component} from 'react'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { Content, List, ListItem, Left, Thumbnail, Body, Text, Button, Icon, Right } from 'native-base';

class Com extends Component{
  rItem= (item) => (
    <ListItem
    keys={item.recordID}
    button onPress={() => this.props.onPress(item.recordID)}
    noIndent
    style={{ backgroundColor: item.recordID === this.props.key ? "#cde1f9" : '#fff' }}>
    <Left style={{ flex: 1 }}>
      <Thumbnail square source={!!item.thumbnailPath ? { uri: item.thumbnailPath } : require('@thumbnails/category/default-contact.png')} />
    </Left>
    <Body style={{ flex: 4 }}>
      <Text>{item.givenName}</Text>
      {item.phoneNumbers.length > 0 && item.phoneNumbers.map((ele, keyele) => <Text key={keyele} note>{ele.number}</Text>)}
    </Body>
  </ListItem>
  )
  render(){
    return (
      <OptimizedFlatList
      data={this.props.dataContacts}
      renderItem={ ({item}) => this.rItem(item)}
      />
    )
  }
}
export default Com;