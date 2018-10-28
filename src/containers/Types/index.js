import React, { Component } from 'react';

import { View, Content, Accordion, Text, Icon, Button, CardItem, Body, Right, H3 } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import { CATEGORY_TYPES } from '@constants/title'
import firebase from 'react-native-firebase';
import Loading from '@components/Loading';

class Types extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), right: this.renderRightHeader(), title: CATEGORY_TYPES })
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

  renderRightHeader = () => {
    return (
      <Button transparent onPress={this.addTypes}>
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
  sortArray = (data, parentId = "") => data.filter(e => e.parent === parentId).map(e => ({ ...e, content: this.sortArray(data, e.id) }))
  onCollectionUpdate = (querySnapshot) => {
    let dataTypes = [];
    querySnapshot.forEach((e) => {
      dataTypes.push({ ...e.data(), id: e.id, content: [] });
    });
    dataTypes = this.sortArray(dataTypes);
    console.log(dataTypes)
    this.setState({ dataTypes, isLoading: false })
  }

  renderContent = ({ content, des }) => (

    <Content padder style={{ borderWidth: 1, borderColor: '#95aed6' }}>
      {!!des &&
        <View style={{ marginBottom: 2 }}>
          <Text style={{ fontWeight: '600' }}>Chú thích:</Text>
          <Text>{des}</Text>
        </View>
      }
      <View style={{ marginBottom: 2 }}>
        <Text style={{ fontWeight: '600' }}>Chức năng:</Text>
        <Button small transparent style={{ padding: 0 }}>
          <Text style={{ padding: 0 }}>Loại số đo</Text>
        </Button>
        <Button small transparent>
          <Text>Hình ảnh</Text>
        </Button>
      </View>

      {(content instanceof Array) === true && content.length > 0 &&

        <View style={{ marginBottom: 2 }}>
          <Text style={{ fontWeight: '600' }}>Danh mục con</Text>
          <Accordion
            style={{borderWidth: 0}}
            dataArray={content}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
          />
        </View>
      }
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
    let { isLoading, dataTypes } = this.state;

    return (
      isLoading ? <Loading /> :
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
export default withNavigation(Types);