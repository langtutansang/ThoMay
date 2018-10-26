import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native'
class Loading extends Component {

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>

    )
  }
}

export default (Loading);