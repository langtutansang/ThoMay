import React, { Component } from 'react';

import { Body, Right, Content, Text, Icon, Button, List, ListItem, Card, CardItem, Item, Input, Label } from 'native-base';
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
      isLoading: true,
      dataMeaTypes: [],
      dataMeaGroups: []
    }
  }

  setBack = () => {
    this.props.navigation.navigate('list')
    return true;
  }

  addTypes = () => {
    this.props.navigation.navigate('addTypes', { preList: 'types' })

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
    this.setState({ dataTypes, isLoading: false })
  }

  onCollectionUpdateMeaGroups = (querySnapshot) => {
    let dataMeaGroups = [];
    querySnapshot.forEach((e) => {
      dataMeaGroups.push({ ...e.data(), id: e.id });
    });
    this.setState({ dataMeaGroups, isLoading: false })
  }
  
  render() {
    let { isLoading, dataTypes } = this.state;
    return (
      isLoading ? <Loading /> :
        <Content padder>
          <List>
            {dataTypes.map((e, key) =>
              <ListItem key={key}>
                <Body>
                  <Item>
                    <Label>Tên:</Label>

                    <Input
                      value={titleEdit === null ? e.title : titleEdit}
                      onChangeText={e => this.setState({ titleEdit: e })} />
                  </Item>
                </Body>
                <Right>
                  <Button transparent onPress={() => this.setState({ keyEdit: key })}>
                    <IconFA name='pencil-square-o' size={25} />
                  </Button>
                </Right>
              </ListItem>
            )}
          </List>
        </Content>
    )
  }
}
export default withNavigation(MeasuresGroups);