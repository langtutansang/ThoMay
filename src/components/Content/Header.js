import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { connect } from 'react-redux'
import { drawerOpen } from '@actions/drawer'
import { View } from 'react-native-animatable';
import { bindActionCreators } from 'redux'

class HeaderComponent extends Component {

  render() {
    let { left, body, right, openDrawer, title } = this.props
    return (
      <View>
      <Header
        toolbarDefaultBg="#000000"
        toolbarHeight={15}
      >
       
        <Left>
          {!!left ? left :
            <Button 
              transparent
              onPress={()=>this.props.openDrawer()}
            >
              <Icon name='menu' />
            </Button>
          }
        </Left>
        
        <Body>
          { !!body ? body :
          <Title>{this.props.title}</Title>
          }
        </Body>
        <Right>{!!right ? right : null}</Right>
      </Header>
      </View>

    );
  }
}

mapDispatchToProps = (dispatch) =>({
  openDrawer: bindActionCreators(drawerOpen, dispatch),

})

export default  connect(null,mapDispatchToProps)(HeaderComponent);


