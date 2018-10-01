import React, { Component } from 'react';
import { Container, Content as ContentBase } from 'native-base';
import FooterComonent from './Footer'
import HeaderComponent from './Header'
class Content extends Component {
  render() {
    let { contentChild, routeName, title } = this.props;
    let Child = contentChild;
    return (
      <Container>
        <HeaderComponent title={title}/>
        <ContentBase padder>
          <Child/>
        </ContentBase>
        <FooterComonent routeName={routeName} />     
      </Container>
    );
  }
}
export default Content;
