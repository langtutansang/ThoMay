import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, Button, Icon, ActionSheet, Body, Right, H3, Content, Accordion, Card, CardItem, List, ListItem } from 'native-base';
import { withNavigation } from 'react-navigation'
import { MEASURE_CUSTOMER } from '@constants/title'
import Loading from '@components/Loading';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

class MeasureCustomer extends Component {

  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), title: MEASURE_CUSTOMER, right: this.renderRightHeader() })
    this.idContact = navigation.state.params.idContact;

    this.refMeasureCustomer = firebase.firestore().collection('contacts').doc(this.idContact);
    this.refTypes = firebase.firestore().collection('types');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      isLoading: true,
      isLoadingTypes: true,
      data: {},
      dataTypesObject: {},
      dataTypes: [],
    }
  }

  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  renderRightHeader = () => {
    return (
      <Button transparent onPress={this.addMeasureCustomer}>
        <Icon name='ios-add-circle' />
      </Button>
    )
  }
  addMeasureCustomer = () => {
    if (!this.state.isLoadingTypes) {
      BUTTONS = this.state.dataTypes.map(e => ({ text: e.title, id: e.id }))
      ActionSheet.show(
        {
          options: BUTTONS,
          title: "Chọn kiểu đồ"
        },
        buttonIndex => {
          if (buttonIndex !== undefined) this.props.navigation.navigate('addMeasureCustomer', { preList: 'home', idContact: this.idContact, idTypes: BUTTONS[buttonIndex].id })
        }
      )
    }
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe = this.refMeasureCustomer.onSnapshot(this.onCollectionUpdate)
    this.unsubscribeTypes = this.refTypes.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdateTypes)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe();
    this.unsubscribeTypes();
  }

  onCollectionUpdate = (querySnapshot) => {
    let { _data } = querySnapshot;
    _data = { ..._data, measureCustomer: !!_data.measureCustomer ? JSON.parse(_data.measureCustomer) : {} }
    this.setState({ data: _data, isLoading: false })
  }

  onCollectionUpdateTypes = (querySnapshot) => {
    let dataTypes = [];
    let dataTypesObject = {};
    querySnapshot.forEach((e) => {
      dataTypesObject[e.id] = { ...e.data() };
      dataTypes.push({ ...e.data(), id: e.id })
    });
    this.setState({ dataTypes, dataTypesObject, isLoadingTypes: false })
  }
  renderContent = ({ meaGroup }) => {
    meaGroup.reverse();
    return <Content padder style={{ borderWidth: 1, borderColor: '#95aed6' }}>
      {meaGroup.map((ele, keyEle) =>

        <Card key={keyEle}>

            <CardItem header>
              <Text>{ele.time}</Text>
              <Right  style={{padding: 0}}>
                <Icon name='arrow-forward' size={25} />
              </Right>
              </CardItem>

            <List style={{ width: '100%' }}>
              {ele.arr.map((e, key) =>
                <ListItem key={key}>
                  <Text>{`${e.title}: ${e.value || ""}`}</Text>
                </ListItem>
              )}
            </List>
        </Card>

      )}
    </Content>
  }

  renderHeader({ title }, expanded) {
    return (
      <CardItem header
        style={{
          backgroundColor: expanded ? '#95aed6' : null,
          borderRadius: 0,
          borderColor: expanded ? '#95aed6' : '#d3d3d3',
          borderBottomWidth: 1,
          marginTop: 5
        }}
      >
        <Body><H3 style={{ fontWeight: "400" }}>{title}</H3></Body>

        <Right>
          {expanded
            ? <Icon style={{ fontSize: 18, color: '#d3d3d3' }} name="arrow-down" />
            : <Icon style={{ fontSize: 18, color: '#d3d3d3' }} name="arrow-forward" />}
        </Right>

      </CardItem>
    );
  }

  render() {
    let { data, isLoading, isLoadingTypes } = this.state;
    // let viewShow = null;
    // if(!!data.measureCustomer){
    //   Object.keys(data.measureCustomer).fillorEach()
    // }
    if (!!data.measureCustomer) {
      let a = Object.keys(data.measureCustomer).map(e => ({ id: e, ...data.measureCustomer[e] }));
      console.log(a);
    }
    return (
      isLoading || isLoadingTypes ? <Loading /> :
        !!data.measureCustomer &&
        <Accordion
          style={{ borderWidth: 0 }}
          dataArray={Object.keys(data.measureCustomer).map(e => ({ id: e, ...data.measureCustomer[e] }))}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
        />


    )
  }
}
export default withNavigation(MeasureCustomer);