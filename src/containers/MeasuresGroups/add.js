import React, { Component } from 'react';

import { Picker, Body, Right, Content, Text, Icon, Button, List, ListItem, Card, CardItem, Item, Input, Label, Toast } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import { CATEGORY_MEASURES_GROUPS_ADD } from '@constants/title'
import firebase from 'react-native-firebase';
import Loading from '@components/Loading';
import IconFA from 'react-native-vector-icons/FontAwesome';

class AddMeasuresGroups extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({
      left: this.renderLeftHeader(),
      right: this.renderRightHeader(),
      title: CATEGORY_MEASURES_GROUPS_ADD
    })
    this.id = navigation.state.params.id;
    this.refGroups = firebase.firestore().collection('measuresGroups');
    this.refTypes = firebase.firestore().collection('measuresTypes');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      dataMeasuresGroups: [],
      dataMeasuresTypes: [],
      isLoadingMeasuresGroups: true,
      isLoadingMeasuresTypes: true,
      isAdd: false,
      title: '',
      keyEdit: -1,
      titleEdit: '',
    }
  }
  setBack = () => {
    this.props.navigation.goBack()
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
    this.unsubscribeMeaGroups = this.refGroups.where('user', '==', this.uid).where('types', '==', this.id).onSnapshot(this.onCollectionUpdateMeaGroups)
    this.unsubscribeMeaTypes = this.refTypes.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdateMeaTypes)
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    this.unsubscribeMeaGroups();
    this.unsubscribeMeaTypes();
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }

  onCollectionUpdateMeaGroups = (querySnapshot) => {
    let dataMeasuresGroups = [];
    querySnapshot.forEach((e) => {
      dataMeasuresGroups.push({ ...e.data(), id: e.id });
    });
    this.setState({ dataMeasuresGroups, isLoadingMeasuresGroups: false })
  }
  onCollectionUpdateMeaTypes = (querySnapshot) => {
    let dataMeasuresTypes = [];
    querySnapshot.forEach((e) => {
      dataMeasuresTypes.push({ ...e.data(), id: e.id });
    });
    this.setState({ dataMeasuresTypes, isLoadingMeasuresTypes: false })
  }
  addMeasureGroup = () => {
    if (this.state.title === "") Toast.show({
      text: "Cần chọn loại",
      position: "top"
    })
    else this.refGroups.add({ title: this.state.title, user: this.uid, types: this.id })
      .then(() => this.setState({ title: '' }))
  }
  editMeasureGroups = (id) => {
    this.refGroups.doc(id).update({ title: this.state.titleEdit })
      .then(() => this.setState({ keyEdit: -1, titleEdit: '' }))
  }
  delMeaGroups = (id) => {
    this.refGroups.doc(id).remove();
  }
  render() {
    let { 
      isLoadingMeasuresGroups, 
      isLoadingMeasuresTypes, 
      isAdd, 
      dataMeasuresGroups, 
      dataMeasuresTypes, 
      title, 
      titleEdit, 
      keyEdit } = this.state;

    return (
      isLoadingMeasuresGroups || isLoadingMeasuresTypes ? <Loading /> :
        <Content padder>
          {isAdd && <Card>
            <CardItem>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={title}
                onValueChange={(value) => this.setState({ title: value })}
              >
                <Picker.Item label={"Chọn loại"} value={""} />
                {dataMeasuresTypes.map((e, key) =>
                  <Picker.Item key={key} label={e.title} value={e.title} />
                )}
              </Picker>
            </CardItem>
            <CardItem style={{ marginLeft: 'auto' }}>
              <Button success onPress={this.addMeasureGroup} style={{ marginRight: 5 }}>
                <Text>Lưu</Text>
              </Button>
              <Button warning onPress={() => this.setState({ isAdd: false, title: "" })}>
                <Text>Đóng</Text>
              </Button>
            </CardItem>
          </Card>
          }
          <List>
            {dataMeasuresGroups.map((e, key) =>
              keyEdit === key
                ?
                <ListItem key={key}>
                  <Body>
                    <Picker
                      mode="dropdown"
                      style={{ width: undefined, marginRight: 10 }}
                      selectedValue={titleEdit}
                      onValueChange={(value) => this.setState({ titleEdit: value })}
                    >
                      <Picker.Item label={e.title} value={e.title} />
                      {dataMeasuresTypes.filter(ele => ele.title !== e.title).map((ele, eleKey) =>
                        <Picker.Item key={eleKey} label={ele.title} value={ele.title} />                                       
                      )}
                    </Picker>
                  </Body>
                  <Button style={{ marginRight: 20 }} transparent onPress={() => this.editMeasureGroups(e.id)}>
                    <IconFA name='floppy-o' size={25} color="#5cb85c"/>
                  </Button>
                  <Button transparent onPress={() => this.setState({ keyEdit: -1, titleEdit: '' })}>
                    <IconFA name='times' size={25} color="red"/>
                  </Button>
                </ListItem>
                : <ListItem key={key}>
                  <Body>
                    <Text>{e.title}</Text>
                  </Body>
                  <Button 
                    style={{ marginRight: 20 }} 
                    transparent 
                    onPress={() => this.setState({ keyEdit: key, titleEdit: e.title })}>
                      <IconFA name='pencil-square-o' size={25} color="blue"/>
                    </Button>
                    <Button transparent onPress={() => this.delMeaGroups(e.id)}>
                      <IconFA name='trash-o' size={25} color="red"/>
                    </Button>
                </ListItem>

            )}
          </List>
        </Content>
    )
  }
}
export default withNavigation(AddMeasuresGroups);