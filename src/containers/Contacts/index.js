import React, { Component } from 'react';
import { BackHandler, ListView } from 'react-native';
import firebase from 'react-native-firebase';
import { Text, Button, Icon, ActionSheet, ListItem, Left, Body, Thumbnail } from 'native-base';
import { withNavigation  } from 'react-navigation';
import { CATEGORY_CONTACTS } from '@constants/title'
import Loading from '@components/Loading';
import ListContacts from '@components/View/listContact'
class List extends Component {

  constructor(props) {
    super(props);
    let { navigation } = props;
    
    navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_CONTACTS })
    this.ref = firebase.firestore().collection('contacts');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      dataContacts:  new ListView.DataSource({
        rowHasChanged           : (row1, row2) => row1.id !== row2.id,
        sectionHeaderHasChanged : (s1, s2) => s1.title !== s2.title
      }),
      isLoading: true
    }
  }

  showMenuContact = () => {
    var BUTTONS = [
      { text: 'Tạo mới', screen: () => this.props.navigation.navigate('addContacts',{ preRoute: 'list' }) },
      { text: 'Lấy từ danh bạ', screen: () => this.props.navigation.navigate('listContacts',{ preRoute: 'list' })} ,
    ];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: "Chọn từ"
      },
      key =>{
        if( !!BUTTONS[key] && key!==2) BUTTONS[key].screen()
      } 
    )
  }
  
  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  renderRightHeader = () => {
    return (
      <Button transparent onPress={this.showMenuContact}>
        <Icon name='ios-contacts' />
      </Button>
    )
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.setBack);
    this.unsubscribe = this.ref.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdate)
  }
  onCollectionUpdate = (querySnapshot) => {
    let arrayChar = [...Array(26)].map((_, i) => (String.fromCharCode('A'.charCodeAt(0) + i)));

    let data =  [...Array(26)].map((_, i) => (
      [{
        title:String.fromCharCode('A'.charCodeAt(0) + i)
      }]
    ));
    data.push( [{ title: "#"}] )
    querySnapshot.forEach((e) => {
      let name = [e.data().firstName, e.data().lastName].filter(e => !!e).join(' ');
      let index = arrayChar.indexOf(name.charAt(0).toUpperCase())
      if( index === - 1) index = 26;
      data[index].push(
        {...e.data(), id: e.id, name}
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
    console.log(id)
  }
  render() {
    let { dataContacts, isLoading } = this.state;
    return (
      isLoading ? <Loading/> :
      <ListContacts dataContacts={dataContacts} onPress={this.onPress} />
    )
  }
}
export default withNavigation(List);