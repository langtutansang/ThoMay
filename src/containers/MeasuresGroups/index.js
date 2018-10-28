import React, { Component } from 'react';

import { Accordion, H3, Body, Right, Content, Text, Icon, Button, List, ListItem, Card, CardItem, Item, Input, Label } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import { CATEGORY_MEASURES_GROUPS } from '@constants/title'
import firebase from 'react-native-firebase';
import Loading from '@components/Loading';
import IconFA from 'react-native-vector-icons/FontAwesome';

class MeasuresGroups extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_MEASURES_GROUPS })
    this.refTypes = firebase.firestore().collection('types');
    this.refMeaGroups = firebase.firestore().collection('measuresGroups');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      isLoadingTypes: true,
      isLoadingMeaGroups: true,
      dataMeaTypes: [],
      dataMeaGroups: []
    }
  }

  setBack = () => {
    this.props.navigation.navigate('list')
    return true;
  }

  addMeasureGroups = (id) => {
    this.props.navigation.navigate('addMeasuresGroups', { preList: 'types', id })

  }

  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  componentDidMount() {
    this.unsubscribeTypes = this.refTypes.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdateTypes)
    this.unsubscribeMeaGroups = this.refMeaGroups.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdateMeaGroups)    
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }

  componentWillUnmount() {
    this.unsubscribeTypes();
    this.unsubscribeMeaGroups();
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }

  onCollectionUpdateTypes = (querySnapshot) => {
    let dataTypes = [];
    querySnapshot.forEach((e) => {
      dataTypes.push({ ...e.data(), id: e.id });
    });
    this.setState({ dataTypes, isLoadingTypes: false })
  }

  onCollectionUpdateMeaGroups = (querySnapshot) => {
    let dataMeaGroups = [];
    querySnapshot.forEach((e) => {
      dataMeaGroups.push({ ...e.data(), id: e.id });
    });
    this.setState({ dataMeaGroups, isLoadingMeaGroups: false })
  }

  renderContent = ({ content, id, des }) => (
    <Content padder style={{ borderWidth: 1, borderColor: '#95aed6' }}>
      <List style={{marginBottom: 5}}>
      {this.state.dataMeaGroups.filter( e=> e.types === id).map( (e,key) => 
          <ListItem key={key}>
              <Text>{ e.title }</Text>
          </ListItem>
      )}
      </List>
      <Button onPress={() => this.addMeasureGroups(id) } style={{ marginLeft: 'auto', backgroundColor: '#95aed6' }}>
        <Text>Chỉnh sửa</Text>
      </Button>
    </Content>
  )

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
    let { isLoadingMeaGroups, isLoadingTypes, dataTypes } = this.state;
    return (
      (isLoadingMeaGroups || isLoadingTypes) ? <Loading /> :
        <Content padder>
           <Accordion
            style={{borderWidth: 0}}
            dataArray={dataTypes}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
          />
        </Content>
    )
  }
}
export default withNavigation(MeasuresGroups);