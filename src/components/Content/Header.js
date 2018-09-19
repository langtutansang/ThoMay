import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title, Drawer } from 'native-base';
import { View } from 'react-native-animatable';
class HeaderComponent extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  render() {
   
    return (
      <View>
      <Drawer
        open
        ref={(ref) => { this.drawer = ref; }}
        content={<Title>Snag</Title>}
        onClose={() => this.closeDrawer()} >

      </Drawer>
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


