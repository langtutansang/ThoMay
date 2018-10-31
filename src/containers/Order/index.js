import React, { Component } from 'react';
import { BackHandler, ListView } from 'react-native';
import firebase from 'react-native-firebase';
import { Button, Icon, View } from 'native-base';
import { withNavigation } from 'react-navigation';
import { CHOOSE_CUSTOMER } from '@constants/title'
import Loading from '@components/Loading';
import ListContacts from '@components/View/listContact';
import IconFA from 'react-native-vector-icons/FontAwesome';

class List extends Component {

  constructor(props) {
    super(props);
    let { navigation } = props;

    navigation.setParams({ left: this.renderLeftHeader(), title: CHOOSE_CUSTOMER })
    this.ref = firebase.firestore().collection('contacts');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      dataContacts: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id,
        sectionHeaderHasChanged: (s1, s2) => s1.title !== s2.title
      }),
      isLoading: true,
      data: []
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
    this.unsubscribe = this.ref.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdate)
  }
  onCollectionUpdate = (querySnapshot) => {
    let arrayChar = [...Array(26)].map((_, i) => (String.fromCharCode('A'.charCodeAt(0) + i)));

    let data = [...Array(26)].map((_, i) => (
      [{
        title: String.fromCharCode('A'.charCodeAt(0) + i)
      }]
    ));
    data.push([{ title: "#" }])
    querySnapshot.forEach((e) => {
      let name = [e.data().firstName, e.data().lastName].filter(e => !!e).join(' ');
      let index = arrayChar.indexOf(name.charAt(0).toUpperCase())
      if (index === - 1) index = 26;
      data[index].push(
        { ...e.data(), id: e.id, name }
      )
    });

    data = data.filter(e => e.length > 1)
    this.setState({
      dataContacts: this.state.dataContacts.cloneWithRowsAndSections(data), isLoading: false
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe();

  }
  onPress = (id) => {
    this.props.navigation.navigate('measureCustomer', { preList: 'home', idContact: id })
  }
  render() {
    let { dataContacts, isLoading } = this.state;
    return (
      isLoading ? <Loading /> :
        <View>
          {/* <Item style={{ marginHorizontal: 15 }}>
            <Icon name="ios-search" />
            <Input placeholder="Tìm kiếm" />
            <IconFA name='times' size={20} />
          </Item> */}
          <ListContacts dataContacts={dataContacts} onPress={this.onPress} />
        </View>
    )
  }
}
export default withNavigation(List);