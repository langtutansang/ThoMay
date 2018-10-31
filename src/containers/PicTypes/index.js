import React, { Component } from 'react';

import { CheckBox, Accordion, H3, Body, Right, Content, Text, Icon, Button, List, ListItem, Card, CardItem, Item, Input, Label, View, Thumbnail } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler, Image, Modal, TouchableOpacity } from 'react-native';
import { CATEGORY_PICTYPES } from '@constants/title'
import firebase from 'react-native-firebase';
import Loading from '@components/Loading';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import uuid from 'uuid/v4';
import * as Progress from 'react-native-progress';
import RNFS from 'react-native-fs';
class PicTypes extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({
      left: this.renderLeftHeader(),
      title: CATEGORY_PICTYPES,
    })
    this.refTypes = firebase.firestore().collection('types');
    this.refPicTypes = firebase.firestore().collection('picTypes');
    this.refStoragePicTypes = firebase.storage().ref('picTypes');
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      isLoadingTypes: true,
      isLoadingPicTypes: true,
      dataTypes: [],
      dataPicTypes: [],
      delPicTypes: [],
      openModal: false,
      percentUpload: 0,
      showPie: false
    }
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }
  uploadPic = (image, id, num) => {
    let name = uuid()
    const unsubscribe = this.refStoragePicTypes.child(name).put(image[num]).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let percentUpload = (snapshot.bytesTransferred / snapshot.totalBytes + num) / image.length;
        this.setState({ percentUpload })
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          unsubscribe();
          RNFS.copyFile(image[num], `${RNFS.ExternalStorageDirectoryPath}/ThoMay/${name}`);
          this.refPicTypes.add({
            user: this.uid,
            picture: snapshot.downloadURL,
            name,
            types: id
          })
          if (num + 1 < image.length) this.uploadPic(image, id, num + 1);
          else this.setState({ percentUpload: 0, showPie: false })
        }
      },
      () => {
        unsubscribe();
      },
    );
  }
  addPic = (id) => {
    ImagePicker.openPicker({
      multiple: true
    }).then(image => {
      image = image.map(e => (e.path));
      this.setState({ showPie: true }, () => this.uploadPic(image, id, 0))
    });

  }

  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  componentDidMount() {
    this.unsubscribeTypes = this.refTypes.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdateTypes)
    this.unsubscribePicTypes = this.refPicTypes.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdatePicTypes )
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }

  componentWillUnmount() {
    this.unsubscribeTypes();
    this.unsubscribePicTypes();
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }

  onCollectionUpdateTypes = (querySnapshot) => {
    let dataTypes = [];
    querySnapshot.forEach((e) => {
      dataTypes.push({ ...e.data(), id: e.id });
    });
    this.setState({ dataTypes, isLoadingTypes: false })
  }

  onCollectionUpdatePicTypes = (querySnapshot) => {
    
    let dataPicTypes = [];  
    querySnapshot.forEach((e) => {
      let data = { ...e.data(), id: e.id };     
      dataPicTypes.push(data);
    });
    this.downLoadImg(dataPicTypes);
  }
  downLoadImg = async ( dataPicTypes) =>  {
    for(i = 0; i < dataPicTypes.length; i++){
      let { name } = dataPicTypes[i];
      let exist = await RNFS.exists(`${RNFS.ExternalStorageDirectoryPath}/ThoMay/${name}`);
      if(!exist) {
          await this.refStoragePicTypes.child(name)
          .downloadFile(`${RNFS.ExternalStorageDirectoryPath}/ThoMay/${name}`)
      }
    }

    this.setState({ dataPicTypes, isLoadingPicTypes: false })

  }
  renderContent = ({ id }) => (
    <Content padder style={{ borderWidth: 1, borderColor: '#95aed6' }}>
      {this.state.showPie &&
        <Progress.Bar color="#5cb85c" width={null} progress={this.state.percentUpload} />
      }
      {this.state.openModal ?<Modal
        visible={true}
        transparent={true}
        onRequestClose={() => this.setState({ openModal: false })}
        animationType="fade">
        <ImageViewer
          imageUrls={this.state.dataPicTypes.filter(e => e.types === id).map(e => ({ url: `file:///${RNFS.ExternalStorageDirectoryPath}/ThoMay/${e.name}` }))}
        />
      </Modal>
      :
      <View style={{ marginBottom: 5, display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
        {this.state.dataPicTypes.filter(e => e.types === id).map((item, key) =>
          <TouchableOpacity
            style={{ margin: 2, position: 'relative' }}
            key={key}
            onPress={() => this.setState({ openModal: true })}
          >
            <Image
              style={{ height: 75, width: 75 }}
              source={{ uri: `file:///${RNFS.ExternalStorageDirectoryPath}/ThoMay/${item.name}`}}
            />
          </TouchableOpacity>

        )}
      </View>
      }
    </Content>
  )

  renderHeader = ({ title, id }, expanded)  =>{
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
            ?
            <TouchableOpacity onPress={() => this.addPic(id)}>
              <Text style={{ color: 'blue' }}>Up ảnh</Text>
            </TouchableOpacity>
            : <Icon style={{ fontSize: 18, color: '#d3d3d3' }} name="arrow-forward" />}
        </Right>
      </CardItem>
    );
  }

  render() {
    let { isLoadingPicTypes, isLoadingTypes, dataTypes } = this.state;
    return (
      (isLoadingPicTypes || isLoadingTypes) ? <Loading /> :
        <Content padder>
          <Accordion
            style={{ borderWidth: 0 }}
            dataArray={dataTypes}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
          />
        </Content>
    )
  }
}

export default withNavigation(PicTypes);