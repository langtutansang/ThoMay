import React, { Component } from 'react';

import {Content, Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';
import { 
  CATEGORY_CONTACTS, 
  CATEGORY_TYPES, 
  CATEGORY_MEASURES_TYPES } from '@constants/title'
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
    let menu = [
      { navigate: 'contacts', thumbnails: require('@thumbnails/category/Contacts.png'), title: CATEGORY_CONTACTS },
      { navigate: 'types', thumbnails: require('@thumbnails/category/Categories.png'), title: CATEGORY_TYPES },
      { navigate: 'measuresTypes', thumbnails: require('@thumbnails/category/TapeMeasures.png'), title: CATEGORY_MEASURES_TYPES },
    ]
     return (
      <Content padder>
        
          {menu.map( (e, key) =>
          <Card key={key}>
            <CardItem  button 
            onPress={()=> this.props.navigation.navigate( e.navigate, { preRoute: 'list' }) }
            >
              <Left>
                { !!e. thumbnails && <Thumbnail square source={e.thumbnails} />}
                <Body>
                  <Text>{ e.title }</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          )}
      </Content>
    )
  }
}
export default withNavigation(List);