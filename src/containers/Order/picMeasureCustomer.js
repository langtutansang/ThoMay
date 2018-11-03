import React, { Component } from 'react';
import { BackHandler, TouchableOpacity, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, Button, Icon, ActionSheet, Body, Right, H3, Content, Accordion, Card, CardItem, List, ListItem } from 'native-base';
import { withNavigation } from 'react-navigation'
import { PIC_MEASURE_CUSTOMER } from '@constants/title'
import Loading from '@components/Loading';
import RNFS from 'react-native-fs';

class PicMeasureCustomer extends Component {

  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), title: PIC_MEASURE_CUSTOMER, right: this.renderRightHeader() })
    this.idContact = navigation.state.params.idContact;
    this.idTypes = navigation.state.params.idTypes;
    this.uid = firebase.auth().currentUser._user.uid;
    this.refPicTypes = firebase.firestore().collection('picTypes');
    this.refStoragePicTypes = firebase.storage().ref('picTypes');
    this.state = {
      isLoading: true,
      data: [],
    }
  }

  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  renderRightHeader = () => {
    return (
      <Button transparent onPress={this.addMeasureCustomer}>
        <Icon name='ios-add-circle' />
      </Button>
    )
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe = this.refPicTypes.where('user', '==', this.uid).where('types', '==', this.idTypes).onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    
    let dataPicTypes = [];  
    querySnapshot.forEach((e) => {
      let data = { ...e.data(), id: e.id };     
      dataPicTypes.push(data);
    });
    this.downLoadImg(dataPicTypes);
  }
  downLoadImg = async data => {
    for(i = 0; i < data.length; i++){
      let { name } = data[i];
      let exist = await RNFS.exists(`${RNFS.ExternalStorageDirectoryPath}/ThoMay/${name}`);
      if(!exist) {
          await this.refStoragePicTypes.child(name)
          .downloadFile(`${RNFS.ExternalStorageDirectoryPath}/ThoMay/${name}`)
      }
    }
    this.setState({ data, isLoading: false })
  }

  render() {
    let { data, isLoading } = this.state;
    let { navigation} = this.props
    return (
      isLoading ? <Loading /> :
      <Content>
      <View style={{ marginBottom: 5, display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
        {data.map((item, key) =>
          <TouchableOpacity
            style={{ margin: 2, position: 'relative' }}
            key={key}
            onPress={() => navigation.navigate('finishOrder',{urlPic: `file:///${RNFS.ExternalStorageDirectoryPath}/ThoMay/${item.name}`, ...navigation.state.params}) }
          >
            <Image
              style={{ height: 75, width: 75 }}
              source={{ uri: `file:///${RNFS.ExternalStorageDirectoryPath}/ThoMay/${item.name}`}}
            />
          </TouchableOpacity>
        )}
      </View>
      </Content>
    )
  }
}
export default withNavigation(PicMeasureCustomer);