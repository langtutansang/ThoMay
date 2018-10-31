import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Text, ListItem, Left, Body, Thumbnail } from 'native-base';

class ListContacts extends Component {
  renderSectionItem = (section) => {
    return (
      <ListItem itemDivider>
        <Text>{section[0].title}</Text>
      </ListItem> 
    )
  }
  renderIndexItem = (item, sectionID, index) => {
    if(index === "0") return null;
    return(
      <ListItem
        button onPress={() => this.props.onPress(item.id)}
        noIndent
        >
          <Left style={{ flex: 1 }}>
            <Thumbnail square source={!!item.picture ? { uri: item.picture } : require('@thumbnails/category/default-contact.png')} />
          </Left>
          <Body style={{ flex: 4 }}>
            <Text>{item.name}</Text>
            { item.phone.length > 0 && item.phone.map((ele, keyele) => <Text key={keyele} note>{ele}</Text>)}
          </Body>
      </ListItem>
    )
  }
  render() {
    let { dataContacts } = this.props;
    return (
      <ListView style= {{ marginRight: 10}}
        dataSource={dataContacts}
        renderRow={this.renderIndexItem}
        renderSectionHeader={this.renderSectionItem}
      />
    )
  }

}
export default ListContacts;