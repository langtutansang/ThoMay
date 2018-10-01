import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import {View, Text } from 'native-base';

class List extends Component {

  setBack = () => {
    Actions.list({type:ActionConst.REPLACE })
  }
  componentWillMount() {

      BackHandler.addEventListener('hardwareBackPress', this.setBack );
  }
  
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  render() {
    console.log(this.props)
    return (
      <View>
         <Text>Khách hàng</Text>
      </View>
    )
  }
}
export default List;