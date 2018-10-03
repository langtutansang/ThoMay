import React, { Component } from 'react';

import Content from './Content'
import NestedNavigator from './RouteContent'

class ContentRoute extends Component {

  render() {
    return (
      <Content>
        <NestedNavigator/>
      </Content>    
    );
  }
}
export default ContentRoute;
