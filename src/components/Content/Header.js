import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { View } from 'react-native-animatable';
class HeaderComponent extends Component {

  render() {
   
    return (
      <View>
      <Header
        toolbarDefaultBg="#F8F8F8"
        toolbarHeight={30}
      >
        <Left>

          <Button 
            transparent
            onPress={this.openDrawer}
          >
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>

      </Header>
      </View>

    );
  }
}
export default HeaderComponent;


