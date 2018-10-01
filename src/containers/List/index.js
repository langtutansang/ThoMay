import React, { Component } from 'react';
import { Actions, ActionConst  } from 'react-native-router-flux';

import {View, Container, Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';
import { CATEGORY_CONTACTS } from '@constants/title'
class List extends Component {

  onPress = () => {
   Actions.contacts({type: ActionConst.REPLACE })
   Actions.refresh({ setBackButton: 'list' })
  }
  render() {
     return (
      <View>
        <Card>
          <CardItem button onPress={this.onPress}>
            <Left>
              <Thumbnail square source={require('@thumbnails/category/Contacts.png')} />
              <Body>
                <Text>{ CATEGORY_CONTACTS }</Text>

              </Body>
            </Left>
          </CardItem>
        </Card>

      </View>
    )
  }
}
export default List;