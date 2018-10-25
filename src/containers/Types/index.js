import React, { Component } from 'react';

import { View, Content, Accordion, Text, Icon, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import { CATEGORY_TYPES } from '@constants/title'
import firebase from 'react-native-firebase';

class Types extends Component {
  constructor(props) {
    super(props);
    let { uid } = firebase.auth().currentUser._user;
    let { navigation } = props;
    
    navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_TYPES })
    this.ref = firebase.firestore().collection('types');

    this.state = {
      uid,
      isLoading: true
    }
  }
  setBack = () => {
    this.props.navigation.navigate('list')
    return true;
  }
  addTypes = () =>{
    this.props.navigation.navigate('addTypes', {preList: 'types'} )

  }
  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  renderRightHeader = () => {
    return (
      <Button transparent onPress={this.addTypes}>
        <Icon name='ios-contacts' />
      </Button>
    )
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  renderContent = ({ content: data, des }) => (
    (data instanceof Array) === true && data.length > 0 ?
      <Content padder>
        {des}
        <Accordion
          dataArray={data}
          renderContent={this.renderContent}
        />

      </Content>
      :
      <Content padder>
        <Text>{des}</Text>
      </Content>
  )
  renderDes= (data)=>{
    return <Text style={{marginBottom: 5}}>{data}</Text>
  }
  render() {
    let arr =
      [
        { title: '123', des:  this.renderDes('sang'), content: 'Sang' },
        {
          title: '123', des: this.renderDes('sang'), content:
            [
              { title: '123', content: '', des: 'sang' },
              { title: '123', content: '', des: 'sang' },
            ]
        }

      ];
    return (
      <Content padder>
        <Accordion
          dataArray={arr}

          renderContent={this.renderContent}
        />
      </Content>

    )
  }
}
export default withNavigation(Types);