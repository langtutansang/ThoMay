import React, { Component } from 'react';

import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import FormAddTypes from '@components/Form/addTypes';
import firebase from 'react-native-firebase';
import { CATEGORY_ADDTYPES } from '@constants/title'
import { Icon, Button, Text } from 'native-base';
import Loading from '@components/Loading';

class AddTypes extends Component {
  constructor(props){
    super(props);
    props.navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_ADDTYPES })
    
    this.ref = firebase.firestore().collection('types');
    this.uid = firebase.auth().currentUser._user.uid;
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
    this.unsubscribe();
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  saveTypes = (data) => {
    this.setState({isLoading : true})
      this.ref.add({ ...data, user: this.uid }).then(() => {
        this.setState({isLoading : false},() => this.props.navigation.navigate('types'))
        
      })
  }

  onCollectionUpdate = (querySnapshot) => {   
    let dataTypes = []
    querySnapshot.forEach((e) => {
      dataTypes.push({...e.data(), id: e.id});
    });
    let data = [];
    sortArray = (sort, space) => {
      data = [...data, {...sort,title: space +" " + sort.title }];
      dataTypes.filter(e => e.parent === sort.id).map( e=>{
        sortArray(e, space + "|___");
      })
    }
    dataTypes.filter(e=> e.parent === "").forEach(
      e=> {
        sortArray(e, "")
      }
    )
    this.setState({dataTypes: data, isFetch: false})
  }

  render() {
    let { dataTypes, isLoading, isFetch } = this.state;
    return (
     !isFetch ? 
      <FormAddTypes dataTypes={dataTypes} isLoading={isLoading} saveTypes={this.saveTypes}/>
      : <Loading/>
    )
  }
}
export default withNavigation(AddTypes);