import React, { Component } from 'react';

import {View, Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';
import { CATEGORY_CONTACTS } from '@constants/title'
import { StackActions, withNavigation } from 'react-navigation';

class List extends Component {
  render() {
     return (
      <View>
        <Card>
          <CardItem button 
          onPress={()=> this.props.navigation.navigate( 'contacts', { preRoute: 'list' }) }
          >
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
export default withNavigation(List);