import React, { Component } from 'react';
import { Container, Content as ContentBase } from 'native-base';
import FooterComonent from './Footer'
import HeaderComponent from './Header'

class Content extends Component {
  render() {
    let { children, routeName, ...rest } = this.props;
    return (
      <Container>
        <HeaderComponent {...rest}/>
        <ContentBase padder>
          {children}
        </ContentBase>
        <FooterComonent routeName={routeName} />     
      </Container>
    );
  }
}
export default Content;
