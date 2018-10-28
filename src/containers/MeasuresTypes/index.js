import React, { Component } from 'react';

import { Body, Right, Content, Text, Icon, Button, List, ListItem, Card, CardItem, Item, Input, Label } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import { CATEGORY_MEASURES_TYPES } from '@constants/title'
import firebase from 'react-native-firebase';
import Loading from '@components/Loading';
import IconFA from 'react-native-vector-icons/FontAwesome';

class MeasuresTypes extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_MEASURES_TYPES })
    this.ref = firebase.firestore().collection('measuresTypes');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      isLoading: true,
      isAdd: false,
      title: '',
      keyEdit: -1,
      titleEdit: null,
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
  renderRightHeader = () => {
    return (
      <Button transparent onPress={() => this.setState({ isAdd: true })}>
        <Icon name='ios-add-circle' />
      </Button>
    )
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
    this.setState({ dataTypes, isLoading: false })
  }

  addMeasure = () => {
    this.ref.add({ title: this.state.title, user: this.uid })
      .then(() => this.setState({ title: '' }))
  }
  editMeasure = (id) => {
    this.ref.doc(id).update({title: this.state.titleEdit}).then( ()=> this.setState({ keyEdit: -1, titleEdit: null }))
  }
  render() {
    let { isLoading, isAdd, dataTypes, title, titleEdit, keyEdit } = this.state;

    return (
      isLoading ? <Loading /> :
        <Content padder>
          {isAdd && <Card>
            <CardItem>
              <Item>
                <Label>Tên:</Label>
                <Input value={title} onChangeText={e => this.setState({ title: e })} />
              </Item>
            </CardItem>
            <CardItem style={{ marginLeft: 'auto' }}>
              <Button success onPress={this.addMeasure} style={{ marginRight: 5 }}>
                <Text>Lưu</Text>
              </Button>
              <Button warning onPress={() => this.setState({ isAdd: false, title: "" })}>
                <Text>Đóng</Text>
              </Button>
            </CardItem>
          </Card>
          }
          <List>
            {dataTypes.map((e, key) => 
              keyEdit === key
                ?
                <ListItem key={key}>
                  <Body>
                    <Item>
                      <Label>Tên:</Label>

                      <Input
                        value={titleEdit === null ? e.title : titleEdit}
                        onChangeText={e => this.setState({ titleEdit: e })} />
                    </Item>
                  </Body>
                    <Button style={{ marginRight: 20 }} transparent onPress={() => this.editMeasure(e.id)}>
                      <IconFA name='floppy-o' size={25} />
                    </Button>
                    <Button transparent onPress={() => this.setState({ keyEdit: -1, titleEdit: null })}>
                      <IconFA name='times' size={25} />
                    </Button>
                </ListItem>
                : <ListItem key={key}>
                  <Body>
                    <Text>{e.title}</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => this.setState({ keyEdit: key, titleEdit: null })}>
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
export default withNavigation(MeasuresTypes);