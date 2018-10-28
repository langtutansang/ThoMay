import React, { Component } from 'react';

import { Content, Card, CardItem, Left, Thumbnail, Body, Text, Right, View } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';

class Products extends Component {
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
      <View padder style={{flex:1}}>
        <Card style={{flex:1}}>
          <CardItem header>
            <Body>
              <Text>Lịch hen</Text>
            </Body>
            <Right>
              <Text>Xem tất cả</Text>

            </Right>
          </CardItem>
        </Card>
        <Card  style={{flex: 1}}>
          <CardItem header>
            <Body>
              <Text>Chi tiết khách hàng</Text>
            </Body>

          </CardItem>
        </Card>
      </View>
    )
  }
}
export default withNavigation(Products);