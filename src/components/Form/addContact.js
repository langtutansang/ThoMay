import React, { Component } from 'react';
import { Content, Item, Input, Button, Text, Thumbnail, Label, Card, CardItem, View, Left, Body } from 'native-base';
import ImagePicker from 'react-native-image-picker';
class AddContactForm extends Component {
  imageDefault = require('@thumbnails/category/Contacts.png')

  state = {
    form: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      picture: "",
      email: "",
      zalo: "",
      fb: "",
      ...this.props.form
    }
  }
  getPic = () => {
    const options = {
      title: 'Chọn ảnh',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (!response.didCancel && !response.error) {
        this.setState({
          form: { ...this.state.form, picture: { uri: 'data:image/jpeg;base64,' + response.data } }
        });
      }
    });
  }
  saveInfo = () => {
    let { form }  = this.state;
    this.props.saveContact(form)
  }
  changeInput = (e, name) => {
    this.setState({
      form: { ...this.state.form, [name]: e }
    })
  }
  render() {
    let { firstName, lastName, phone, address, picture, email, zalo, fb } = this.state.form;
    return (
      <Content padder>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Left style={{ flex: 0.4}}>
            <Card>
              <CardItem button onPress={this.getPic}>
                <Thumbnail square large source={!!picture ? picture : this.imageDefault}/>
              </CardItem>
            </Card>
          </Left>
          <Body style={{ flex: 0.6 }}>
            <Item floatingLabel >
              <Label>Họ</Label>
              <Input value={firstName} onChangeText={e => this.changeInput(e, 'firstName')} />
            </Item>
            <Item floatingLabel padder>
              <Label>Tên</Label>
              <Input value={lastName} onChangeText={e => this.changeInput(e, 'lastName')} />
            </Item>
          </Body>

        </View>


        <Item floatingLabel>
          <Label>SDT</Label>
          <Input value={phone} onChangeText={e => this.changeInput(e, 'phone')} />
        </Item>
        <Item floatingLabel>
          <Label>Địa chỉ</Label>
          <Input value={address} onChangeText={e => this.changeInput(e, 'address')} />
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input value={email} onChangeText={e => this.changeInput(e, 'email')} />
        </Item>

        <Button block success onPress={this.saveInfo} style={{marginTop: 15}}>
          <Text>Lưu thông tin</Text>
        </Button>
      </Content>
    )
  }
}
export default AddContactForm;