import React, { Component } from 'react';

import {View, Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';
import { CATEGORY_CONTACTS } from '@constants/title'
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';

class List extends Component {
  setBack = () => {
    return true
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
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