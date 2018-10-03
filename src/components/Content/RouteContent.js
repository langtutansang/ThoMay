import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Dashboard, List, Contacts } from '@containers'

class RouteContent extends Component {

  render() {
    const NestedNavigator = createStackNavigator({
      dashboard: Dashboard ,
      list:  List , 
      contacts: Contacts
    },{
      headerMode: 'none',
      initialRouteName: 'list'
    });
    return (
      <NestedNavigator/>
    );
  }
}
export default RouteContent;
