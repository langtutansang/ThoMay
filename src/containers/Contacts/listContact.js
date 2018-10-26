import React, { Component } from 'react';
import { ListItem, Left, Thumbnail, Body, Text, Button, Icon, Right } from 'native-base';
import { BackHandler, ListView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Contacts from 'react-native-contacts';
import { CATEGORY_FROMCONTACTS } from '@constants/title';
import Loading from '@components/Loading';

class ListContact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataContacts: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id,
        sectionHeaderHasChanged: (s1, s2) => s1.title !== s2.title
      }),
      isLoading: true
    }
    this.props.navigation.setParams({ left: this.renderLeftHeader(), title: CATEGORY_FROMCONTACTS })
  }
  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toLowerCase() + s.slice(1)
  }
  setContact = (dataContacts) => {

    let arrayChar = [...Array(26)].map((_, i) => (String.fromCharCode('A'.charCodeAt(0) + i)));

    let data = [...Array(26)].map((_, i) => (
      [{
        title: String.fromCharCode('A'.charCodeAt(0) + i)
      }]
    ));
    data.push([{ title: "#" }])
    dataContacts = dataContacts.sort((a, b) => this.capitalize(a.name).localeCompare(this.capitalize(b.name)));
    dataContacts.forEach(e => {
      let name = [e.givenName, e.middleName, e.familyName].filter(e => !!e).join(' ');
      let index = arrayChar.indexOf(name.charAt(0).toUpperCase())
      if (index === - 1) index = 26;
      data[index].push({
        firstName: [e.givenName, e.middleName].filter(e => !!e).join(' '),
        lastName: e.familyName,
        name,
        id: e.recordID,
        picture: e.thumbnailPath,
        phone: e.phoneNumbers.map(e => e.number)
      })
    })
    data = data.filter(e => e.length > 1);
    this.setState({ dataContacts: this.state.dataContacts.cloneWithRowsAndSections(data), isLoading: false })
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }
  addContact = (item) => {
    this.props.navigation.navigate('addContacts', { data: item })
  }
  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);

    Contacts.getAll((err, dataContacts) => {
      if (err) throw err;
      this.setContact(dataContacts)
    })
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toLowerCase() + s.slice(1)
  }

  renderSectionItem = (section) => {
    return (
      <ListItem itemDivider>
        <Text>{section[0].title}</Text>
      </ListItem>
    )
  }
  renderIndexItem = (item, sectionID, index) => {
    if (index === "0") return null;
    return (
      <ListItem noIndent>
        <Left style={{ flex: 1 }}>

          <Thumbnail square source={!!item.picture ? { uri: item.picture }: require('@thumbnails/category/default-contact.png')} />
        </Left>
        <Body style={{ flex: 4 }}>
          <Text>{item.name}</Text>
          {item.phone.length > 0 && item.phone.map((ele, keyele) => <Text key={keyele} note>{ele}</Text>)}
        </Body>
        <Button transparent onPress={() => this.addContact(item)}>
            <Icon name='arrow-forward' />
          </Button>
      </ListItem>
    )
  }

  render() {
    let { dataContacts, isLoading } = this.state;
    return (
      isLoading ? <Loading /> :
        <ListView style={{ marginRight: 10 }}
          dataSource={dataContacts}
          renderRow={this.renderIndexItem}
          renderSectionHeader={this.renderSectionItem}
        />
    )
  }
}

export default withNavigation(ListContact);