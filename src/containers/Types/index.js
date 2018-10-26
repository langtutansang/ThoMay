import React, { Component } from 'react';

import { View, Content, Accordion, Text, Icon, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import { CATEGORY_TYPES } from '@constants/title'
import firebase from 'react-native-firebase';
import Loading from '@components/Loading';

class Types extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_TYPES })
    this.ref = firebase.firestore().collection('types');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
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
        <Icon name='ios-add-circle' />        
      </Button>
    )
  }
  componentDidMount() {
    this.unsubscribe = this.ref.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdate)
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    this.unsubscribe();
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  sortArray = ( data, parentId = "") => data.filter(e => e.parent === parentId).map( e=> ( {...e, content: this.sortArray(data, e.id)}) )
  onCollectionUpdate = (querySnapshot) => {
    let dataTypes = [];
    querySnapshot.forEach((e) => {
      dataTypes.push({...e.data(), id: e.id, content: [] });
    });
    dataTypes = this.sortArray(dataTypes);
    console.log(dataTypes)
    this.setState({dataTypes, isLoading: false})
  }
  
  renderContent = ({ content, des }) => (
    (content instanceof Array) === true && content.length > 0 ?
      <Content style={{paddingLeft: 10, paddingBottom: 10}}>
        {this.renderDes(des)}
        <Accordion
          dataArray={content}
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
    let { isLoading, dataTypes} = this.state;
  
    return (
      isLoading ? <Loading/> : 
      <Content padder>
        <Accordion
          dataArray={dataTypes}

          renderContent={this.renderContent}
        />
      </Content>

    )
  }
}
export default withNavigation(Types);