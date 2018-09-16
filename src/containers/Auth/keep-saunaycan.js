import {connect} from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

const mapDispatchToProps = (dispatch) => {

  return {
    dispatch,
    // loginAction: (loginInfo) => dispatch(login(loginInfo)),
  };
};

const mapStateToProps = ({auth}) => {
  return ({
    auth
  });
};
class Auth extends Component{

  render(){
    let Child = this.props.selector
    return <Child/>    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
