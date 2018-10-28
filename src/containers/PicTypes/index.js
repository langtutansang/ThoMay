import React, { Component } from 'react';

import { CheckBox, Accordion, H3, Body, Right, Content, Text, Icon, Button, List, ListItem, Card, CardItem, Item, Input, Label, View, Thumbnail } from 'native-base';
import { withNavigation } from 'react-navigation';
import { BackHandler, Image, Modal, TouchableOpacity} from 'react-native';
import { CATEGORY_PICTYPES } from '@constants/title'
import firebase from 'react-native-firebase';
import Loading from '@components/Loading';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
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
    this.uid = firebase.auth().currentUser._user.uid;
    this.state = {
      isLoadingTypes: true,
      isLoadingPicTypes: true,
      dataTypes: [],
      dataPicTypes: [],
      addPicTypes: [],
      delPicTypes: [],
      openModal: false
    }
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }

  addMeasureGroups = (id) => {
    ImagePicker.openPicker({
      multiple: true
    }).then(image => {
      this.setState({addPicTypes: image})
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
    this.unsubscribePicTypes = this.refPicTypes.where('user', '==', this.uid).onSnapshot(this.onCollectionUpdatePicTypes)    
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
      dataPicTypes.push({ ...e.data(), id: e.id });
    });
    this.setState({ dataPicTypes, isLoadingPicTypes: false })
  }

  renderContent = ({ id }) => (
    <Content padder style={{ borderWidth: 1, borderColor: '#95aed6' }}>
        <Modal 
          visible={this.state.openModal} 
          transparent={true} 
          onRequestClose={()=> this.setState({openModal: false})}
          animationType="fade">
            <ImageViewer 
              imageUrls={this.state.addPicTypes.map(e => ({url: e.path}) )}
            />
        </Modal>

      <View style={{marginBottom: 5, display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent : 'flex-start' }}>
        {this.state.addPicTypes.map( (item, key) =>  
          <TouchableOpacity
            style={{ margin: 2, position: 'relative'}}
            key={key}
            onPress={()=> this.setState({openModal: true}) }  
            >
          <Image 
            style={{height: 75, width: 75}} 
             
            source={{ uri: item.path }}
            />
            <CheckBox checked={true} style={{ position: 'absolute', left: 0, top: 0}}/>
          </TouchableOpacity>  
          
        )}
      </View>
      <Button onPress={() => this.addMeasureGroups(id) } style={{ marginLeft: 'auto', backgroundColor: '#95aed6' }}>
        <Text>Chỉnh sửa</Text>
      </Button>
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
    let { isLoadingPicTypes, isLoadingTypes, dataTypes } = this.state;
    return (
      (isLoadingPicTypes || isLoadingTypes) ? <Loading /> :
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

export default withNavigation(PicTypes);