import React, { Component } from 'react';

import { Body, Right, Content, Text, Icon, Button, List, ListItem } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import { CATEGORY_MEASURES } from '@constants/title'
import firebase from 'react-native-firebase';
import Loading from '@components/Loading';

class Measures extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_MEASURES })
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
    this.unsubscribe = this.ref.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdate)
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    this.unsubscribe();
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }

  onCollectionUpdate = (querySnapshot) => {
    let dataTypes = [];
    querySnapshot.forEach((e) => {
      dataTypes.push({ ...e.data(), id: e.id });
    });

    let data = [];
    sortArray = (sort) => {
      data = [...data, {...sort}];
      dataTypes.filter(e => e.parent === sort.id).map( e=>{
        sortArray(e);
      })
    }
    dataTypes.filter(e=> e.parent === "").forEach(
      e=> {
        sortArray(e)
      }
    )
    this.setState({ dataTypes: data, isLoading: false })
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
                  <Text>{e.title}</Text>
                </Body>
                <Right>
                  <Button transparent onPress={this.setBack}>
                    <Icon name='arrow-forward' />
                  </Button>
                </Right>
              </ListItem>
            )}
          </List>
        </Content>

    )
  }
}
export default withNavigation(Measures);