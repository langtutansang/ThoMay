import React, { Component } from 'react';

import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import FormAddTypes from '@components/Form/addTypes';
import firebase from 'react-native-firebase';
import { CATEGORY_ADDTYPES } from '@constants/title'
import { Icon, Button, Text } from 'native-base';

class AddTypes extends Component {
  constructor(props){
    super(props);
    props.navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_ADDTYPES })
    let { uid} = firebase.auth().currentUser._user;
    this.ref = firebase.firestore().collection('types');
    this.uid = uid;
    this.state = {
      dataTypes: [],
      isLoading: false,
      isFetch: true
    }
  }
  setBack = () => {
    this.props.navigation.goBack();
    return true
  }
  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }
  componentDidMount() {
    this.unsubscribe = this.ref.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdate)
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  saveTypes = (data) => {
    this.setState({isLoading : true})
      this.ref.add({ ...data, user: this.uid }).then(() => {
        this.setState({isLoading : false}, this.props.navigation.navigate('types'))
        
      })
}

  onCollectionUpdate = (querySnapshot) => {   
    let dataTypes = []
    querySnapshot.forEach((e) => {
      dataTypes.push({...e.data(), id: e.id});
    });
    this.setState({dataTypes, isFetch: false})
  }

  render() {
    let { dataTypes, isLoading, isFetch } = this.state;
    console.log(dataTypes)
    return (
     !isFetch ? 
      <FormAddTypes dataTypes={dataTypes} isLoading={isLoading} saveTypes={this.saveTypes}/>
      : <Text>Đang lấy dữ liệu</Text>
    )
  }
}
export default withNavigation(AddTypes);