import React, { Component } from 'react';
import { BackHandler, ListView } from 'react-native';
import firebase from 'react-native-firebase';
import { Text, Button, Icon, ActionSheet, ListItem, Left, Body, Thumbnail, SwipeRow, Content } from 'native-base';
import { withNavigation  } from 'react-navigation';
import { CANCEL_INDEX, DESTRUCTIVE_INDEX } from '@constants/other'
import { CATEGORY_CONTACTS } from '@constants/title'

class List extends Component {

  constructor(props) {
    super(props);
    let { uid } = firebase.auth().currentUser._user;
    let { navigation } = props;
    
    navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_CONTACTS })
    this.ref = firebase.firestore().collection('contacts');

    this.state = {
      uid,
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
      { text: 'Lấy từ danh bạ', screen: () => this.props.navigation.navigate('listContacts',{ preRoute: 'list' })} 
    ];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Chọn từ"
      },
      key =>{
        if( !!BUTTONS[key]) BUTTONS[key].screen()
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
    this.props.navigation.navigate('list')
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.setBack);
    this.unsubscribe = this.ref.where('user', '==', this.state.uid).onSnapshot(this.onCollectionUpdate)
  }
  onCollectionUpdate = (querySnapshot) => {
    let dataContacts = [];
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

  renderSectionItem = (section) => {
    return (
      <ListItem itemDivider>
        <Text>{section[0].title}</Text>
      </ListItem> 
    )
  }
  renderIndexItem = (item, sectionID, index) => {
    if(index === "0") return null;
    return(
      <ListItem
        button onPress={() => this.onPress(item.id)}
        noIndent
        >
        <Left style={{ flex: 1 }}>
          <Thumbnail square source={!!item.picture ? item.picture : require('@thumbnails/category/default-contact.png')} />
        </Left>
        <Body style={{ flex: 4 }}>
          <Text>{item.name}</Text>
          { item.phone.length > 0 && item.phone.map((ele, keyele) => <Text key={keyele} note>{ele.number}</Text>)}
        </Body>
      </ListItem>
    )
  }
  
  render() {
    let { dataContacts, isLoading } = this.state;
    return (
      isLoading ? <Text>Đang lấy dữ liệu</Text> :
      <ListView style= {{ marginRight: 10}}
        dataSource={dataContacts}
        renderRow={this.renderIndexItem}
        renderSectionHeader={this.renderSectionItem}
      />
    )
  }
}
export default withNavigation(List);