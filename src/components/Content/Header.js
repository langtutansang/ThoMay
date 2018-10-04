import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { connect } from 'react-redux'
import { drawerOpen } from '@actions/drawer'
import { View } from 'react-native-animatable';
import { bindActionCreators } from 'redux'
import { withNavigation  } from 'react-navigation';

class HeaderComponent extends Component {

  render() {
    let { navigation: { state: { params } } }= this.props;
    let { left, body, right } = params || {};
    return (
      <View>
        { ( !left && !body && !right ) ? null :

        <Header>
        
          <Left>
            { (!!left) ? left :
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
          </Header> }
      </View>

    );
  }
}

mapDispatchToProps = (dispatch) =>({
  openDrawer: bindActionCreators(drawerOpen, dispatch),

})

export default  connect(null,mapDispatchToProps)(withNavigation(HeaderComponent));


