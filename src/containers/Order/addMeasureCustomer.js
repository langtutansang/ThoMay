import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import firebase from 'react-native-firebase';
import { Text, Button, Icon, ActionSheet, Item, Input, View, Content, Label } from 'native-base';
import { withNavigation } from 'react-navigation';
import { ADD_MEASURE_CUSTOMER } from '@constants/title'
import Loading from '@components/Loading';
import IconFA from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
class AddMeasureCustomer extends Component {

  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), title: ADD_MEASURE_CUSTOMER})
    this.idContact = navigation.state.params.idContact;
    this.idTypes = navigation.state.params.idTypes;
    this.refMeasureCustomer = firebase.firestore().collection('contacts').doc(this.idContact);
    this.refTypes = firebase.firestore().collection('types').doc(this.idTypes);
    this.refMeaGroups = firebase.firestore().collection('measuresGroups');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      isLoading: true,
      isLoadingTypes: true,
      isLoadingMeaGroups: true,
      data: {},
      dataTypesObject: {},
      dataMeaGroups: []
    }
  }

  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe = this.refMeasureCustomer.onSnapshot(this.onCollectionUpdate)
    this.unsubscribeTypes = this.refTypes.onSnapshot(this.onCollectionUpdateTypes)
    this.unsubscribeMeaGroups = this.refMeaGroups.where('user', '==', this.uid).where('types', '==', this.idTypes).onSnapshot(this.onCollectionUpdateMeaGroups)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe();
    this.unsubscribeTypes();
    this.unsubscribeMeaGroups();
  }

  onCollectionUpdate = (querySnapshot) => {
    let { _data } = querySnapshot;
    _data = { ..._data,  measureCustomer: !!_data.measureCustomer ? JSON.parse(_data.measureCustomer) : {}  }
    this.setState({ data: _data, isLoading: false })
  }

  onCollectionUpdateTypes = (querySnapshot) => {
    let { _data } = querySnapshot;
    _data = { ..._data, id : this.idTypes}
    this.setState({ dataTypesObject: _data, isLoadingTypes: false })
  }

  onCollectionUpdateMeaGroups = (querySnapshot) => {
    let dataMeaGroups = [];
    querySnapshot.forEach((e) => {
      dataMeaGroups.push({ ...e.data(), id: e.id });
    });
    this.setState({ dataMeaGroups, isLoadingMeaGroups: false })
  }

  save = () => {

    let { data, dataMeaGroups, dataTypesObject } = this.state;
    let dataAdd = { ...data};
    dataAdd.measureCustomer[this.idTypes] = {...dataTypesObject, meaGroup: !dataAdd.measureCustomer[this.idTypes] ? [] : dataAdd.measureCustomer[this.idTypes].meaGroup};
    dataAdd.measureCustomer[this.idTypes].meaGroup.push({arr: dataMeaGroups, time: moment().calendar()});
    this.refMeasureCustomer.update({...dataAdd, measureCustomer: JSON.stringify(dataAdd.measureCustomer) })
    .then(res => {
      this.props.navigation.navigate('home')
    })
    .catch( e =>  Toast.show({
      text: e.message,
      position: "top"
    }))
  }
  changeValue = ( value, key) => {
    let dataMeaGroups = [...this.state.dataMeaGroups]
    dataMeaGroups[key] = {...dataMeaGroups[key], value}
    this.setState({dataMeaGroups});
  }
  render() {
    let { dataMeaGroups, isLoading, isLoadingTypes, isLoadingMeaGroups } = this.state;
    return (
      isLoading || isLoadingTypes || isLoadingMeaGroups ? <Loading /> :
        <Content padder>
          {dataMeaGroups.map( (e, key) => 
          <Item key={key}>
            <Label>{e.title}: </Label>
            <Input value={e.value} onChangeText={ (e) => this.changeValue(e, key)}/>
          </Item>)}
          <Button success onPress={this.save}>
            <Text>Lưu</Text>
          </Button>
        </Content>
    )
  }
}
export default withNavigation(AddMeasureCustomer);