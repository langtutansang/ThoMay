import React, { Component } from 'react';
import { Content, Item, Input, Button, Text, Thumbnail, Label, Card, CardItem, View, Left, Body, Toast } from 'native-base';
import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-crop-picker';
import { Image, TouchableOpacity } from 'react-native'
class AddContactForm extends Component {
  imageDefault = require('@thumbnails/category/Contacts.png')

  state = {
    form: {
      firstName: "",
      lastName: "",
      phone: ["", ""],
      address: "",
      picture: "",
      email: "",
      zalo: "",
      fb: "",
      ...this.props.form
    },
  }
  getPic = () => {
    ImagePicker.openPicker({
      width: 130,
      height: 130,
      cropping: true
    }).then(image => {
      this.setState({
        form: { ...this.state.form, picture: image.path }
      });
    });
  }
  saveInfo = () => {

    let { form } = this.state;
    if ((form.firstName !== "" || form.lastName !== "") && form.phone[0] !== "")
      this.props.saveContact(form);
    else Toast.show({
      text: "Cần nhập thông tin",
      position: "top"
    })
  }

  changeInput = (e, name) => {
    this.setState({
      form: { ...this.state.form, [name]: e }
    })
  }
  changePhone = (e, index) => {
    let phone = [...this.state.form.phone];
    phone[index] = e
    this.setState({
      form: { ...this.state.form, phone }
    })
  }
  render() {
    let { firstName, lastName, phone, address, picture, email, zalo, fb } = this.state.form;
    let { isLoading, percent } = this.props;
    return (
      <Content padder>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Left style={{ flex: 0.4 }}>
            <TouchableOpacity onPress={this.getPic}>
              <Image style={{ height: 130, width: 130, borderRadius: 2, borderWidth: 3, borderColor: '#95aed6' }} source={!!picture ? { uri: picture } : this.imageDefault} />
            </TouchableOpacity>
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

        {phone.map((e, key) => {

          return (
            <Item floatingLabel key={key}>
              <Label>SDT {key === 0 ? '' : key + 1}</Label>
              <Input data-mask="0000-000-0000" data-mask-selectonfocus="true" keyboardType="numeric" value={phone[key]} onChangeText={e => this.changePhone(e, key)} />
            </Item>
          )
        }
        )}

        <Item floatingLabel>
          <Label>Địa chỉ</Label>
          <Input value={address} onChangeText={e => this.changeInput(e, 'address')} />
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input keyboardType="email-address" value={email} onChangeText={e => this.changeInput(e, 'email')} />
        </Item>
        {!isLoading ?
          <Button block success onPress={this.saveInfo} style={{ marginTop: 15 }}>
            <Text>Lưu thông tin</Text>
          </Button>
          :
          <View style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>{parseInt(percent * 100, 10)} %</Text>
            <Progress.Bar height={38} color="#5cb85c" width={null} progress={percent} />
          </View>
        }
      </Content>
    )
  }
}
export default AddContactForm;