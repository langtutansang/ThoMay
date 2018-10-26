import React, { Component } from 'react';
import { Content, Item, Input, Button, Text, Label, Toast, Picker, Icon } from 'native-base';
import * as Progress from 'react-native-progress';
class FormAddTypes extends Component {
  constructor(props){
    super(props);
    this.state = {
      form: {
        title: '',
        des: '',
        parent: "",
        ...this.props.form
      },
    };
  }
  
  saveInfo = () => {

    let { form } = this.state;
    if (form.title !== "")
      this.props.saveTypes(form);
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
  
  render() {
    let { title, parent, des } = this.state.form;
    let { isLoading, dataTypes } = this.props;
    return (
      <Content padder>
        <Item floatingLabel>
          <Label>Tên</Label>
          <Input value={title} onChangeText={e => this.changeInput(e, 'title')} />
        </Item>
        <Item floatingLabel>
          <Label>Chú thích</Label>
          <Input value={des} onChangeText={e => this.changeInput(e, 'des')} />
        </Item>
        <Item>
          <Label>Thuộc loại</Label>
          <Picker
            mode="dropdown"
            style={{ width: undefined }}
            selectedValue={parent}
            onValueChange={ (value) => this.changeInput(value, 'parent')}
          >
            <Picker.Item label="Không thuộc" value="" />

            {dataTypes.map( (e, key) => 
              <Picker.Item key={key} label={e.title} value={e.id} />
            )}
          </Picker>
        </Item>
        
        {!isLoading ?
          <Button block success onPress={this.saveInfo} style={{ marginTop: 15 }}>
            <Text>Lưu thông tin</Text>
          </Button>
          : <Progress.Bar indeterminate={true} animated={true} height={38} color="#5cb85c" width={null} />
        }
      </Content>
    )
  }
}
export default FormAddTypes;