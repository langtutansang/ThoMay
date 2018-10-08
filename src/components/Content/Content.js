import React, { Component } from 'react';
import { Container, Content as ContentBase } from 'native-base';
import FooterComonent from './Footer'
import HeaderComponent from './Header'

class Content extends Component {
  render() {
    let { children } = this.props;
    return (
      <Container>
        <HeaderComponent/>
        <ContentBase>
          {children}
        </ContentBase>
        <FooterComonent/>     
      </Container>
    );
  }
}
export default Content;
