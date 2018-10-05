import React, { Component } from 'react';
import { View, List, ListItem, Left, Thumbnail, Body, Text, Button, Icon, Right } from 'native-base';
import { BackHandler } from 'react-native';

import { withNavigation } from 'react-navigation';
import Contacts from 'react-native-contacts';
import { CATEGORY_FROMCONTACTS } from '@constants/title'


class ListContact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataContacts: [],
      key : -1
    }
    let { left, right } = props;

    if (!left || !right) this.setParams()
    Contacts.getContactsMatchingString("",(err, dataContacts) => {
      if (err) throw err;
      this.setState({ dataContacts })
    })
  }
  setParams = () => {
    this.props.navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_FROMCONTACTS })
  }
  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }
  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }
  renderRightHeader = () => {
    return (this.state.key !== -1 ?
      <Button transparent onPress={this.setBack}>
        <Icon name='ios-checkmark-outline'  style={{fontSize: 40}}/>
      </Button> :
      <Text>
      </Text>
    )
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.setBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.key !== this.state.key && this.state.key !== -1) this.setParams()
  }
  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  render() {
    let { dataContacts } = this.state;
    let arrayChar = [...Array(26)].map((_, i) => ({ givenName:String.fromCharCode('A'.charCodeAt(0) + i), divider:true }) );
    let data = [...dataContacts, ...arrayChar, { givenName: '#', divider:true}]
    data.sort((a, b) => this.capitalize(a.givenName).localeCompare(this.capitalize(b.givenName) ))
    data = data.length===27 ? data :  data.filter( (e,key) => !( (!!data[key+1] && !!e.divider && data[key+1].divider ) || (key === (data.length-1) &&  !!e.divider) )  )
    return (
      <View>
        <List >
          {data.map((e, key) => {
            // let name = `${e.givenName ? e.givenName: ''}${e.middleName? ' ' + e.middleName: '' }${e.familyName?' ' + e.familyName : ''} `
            let name = [e.givenName, e.middleName, e.familyName].filter(e => !!e).join(' ')
            return ( !!e.divider ? 
              <ListItem itemDivider key={key} >
                <Text>{e.givenName}</Text>
              </ListItem> :
              <ListItem 
                key={key} 
                button onPress={()=>{
                  this.setState({key});
                }} 
                noIndent  
                style={{ backgroundColor: key === this.state.key ? "#cde1f9" : '#fff' }}> 
                <Left  style={{flex:1}}>
                  <Thumbnail square source={!!e.thumbnailPath ? {uri: e.thumbnailPath}: require('@thumbnails/category/default-contact.png') } />                 
                </Left>
                <Body  style={{flex:4}}>
                  <Text>{name}</Text>
                  {e.phoneNumbers.length>0 && e.phoneNumbers.map( (ele, keyele) => <Text key={keyele} note>{ele.number}</Text> ) }
                </Body>
              </ListItem>
            )}
          )}
        </List>

      </View>
    )
  }
}

export default withNavigation(ListContact);

