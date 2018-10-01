import React, { Component } from 'react';
import { Header, Left, Body, Button, Icon, Title } from 'native-base';
import { connect } from 'react-redux'
import { drawerOpen } from '@actions/drawer'
import { View } from 'react-native-animatable';
import { bindActionCreators } from 'redux'

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
            onPress={()=>this.props.openDrawer()}
          >
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>

      </Header>
      </View>

    );
  }
}

mapDispatchToProps = (dispatch) =>({
  openDrawer: bindActionCreators(drawerOpen, dispatch),

})

export default  connect(null,mapDispatchToProps)(HeaderComponent);


