import React, { Component } from 'react';
import { BackHandler, ListView, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { Button, Icon, View, Content, Text, List, ListItem, Card, CardItem, DatePicker, Input, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
import { FINISH_ORDER } from '@constants/title'
import Loading from '@components/Loading';
import uuid from 'uuidv4';
import IconFA from 'react-native-vector-icons/FontAwesome';

class FinishOrder extends Component {

  constructor(props) {
    super(props);
    let { navigation } = props;
    navigation.setParams({ left: this.renderLeftHeader(), title: FINISH_ORDER })
    this.ref = firebase.firestore().collection('contacts');
    this.uid = firebase.auth().currentUser._user.uid;
    this.idContact = navigation.state.params.idContact;
    this.urlPic = navigation.state.params.urlPic;
    this.idTypes = navigation.state.params.idTypes;
    this.idVai = uuid().slice(0,6);
    this.state = {
      data: [],
      numClo: "1",
      arrMes: navigation.state.params.arrMes,
      date: new Date(),
      edit: false
    }
  }

  renderLeftHeader = () => {
    return (
      <Button transparent onPress={this.setBack}>
        <Icon name='arrow-back' />
      </Button>)
  }

  setBack = () => {
    this.props.navigation.goBack();
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  render() {
    let { arrMes, numClo } = this.state;
    return (
      <Content>
        <Card>
          <CardItem>
            <Text>Chọn ngày giao:</Text>
            <DatePicker
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"spinner"}
              placeHolderText={"Chọn thời gian"}
              onDateChange={(value) => this.setState({ date: value })}
              // defaultDate={new Date(moment().add(14,'days').format('YYYY, MM, dd'))}
              placeHolderTextStyle={{ color: 'red' }}
            />
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Text>Số lượng</Text>
            <Input value={numClo} onChangeText={(e) => this.setState({ numClo: e })} keyboardType="numeric" />
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Text>Ảnh mẫu</Text>
          </CardItem>
          <CardItem>

            <Image
              style={{ height: 250, width: 250 }}
              source={{ uri: this.urlPic }}
            />
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Text>Mã vải: {this.idVai}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Body><Text>Số đo</Text></Body>
            <Right style={{ padding: 0 }}>
              <Button
                transparent
                onPress={() => this.setState({ edit: true})}>
                <IconFA name='pencil-square-o' size={25} color="blue" />
              </Button>

            </Right>
          </CardItem>

          <List style={{ width: '100%' }}>
            {arrMes.map((e, key) =>
              <ListItem key={key}>

                <Text>{`${e.title}: `}</Text><Input value={e.value || ""} onChangeText={(value) => this.setState({arrMes: arrMes.map( (ele, eleKey)=> (eleKey === key ? {...ele, value} : ele)   )  })} />
              </ListItem>
            )}
          </List>
        </Card>
      </Content>
    )
  }
}
export default withNavigation(FinishOrder);