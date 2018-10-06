import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

class MyListItem extends React.PureComponent {
  render() {
    return (

                  <TouchableOpacity onPress={this.props.onPress}>
                    <Text 
                      style={{
                        color: this.props.index === this.props.selected ?  "#cde1f9" : '#000' , 
                        height: 40,
                        justifyContent: 'center'
                      }}>
                      {this.props.item.givenName}
                    </Text>
                  </TouchableOpacity>

    )
  }
}

export default MyListItem;