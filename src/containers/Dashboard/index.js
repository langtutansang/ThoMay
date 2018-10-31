import React, { Component } from 'react';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { ORDER } from '@constants/title'
import { Button, Text, View, Content, Card, CardItem, Body } from 'native-base';
import firebase from 'react-native-firebase';
import { BackHandler, TouchableOpacity, Image } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
class Dashboard extends Component {
  setBack = () => {
    return true
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setBack);
  }
  logout = () => {
    firebase.auth().signOut().then(
      () => {
        const loginAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'login' })],
        });
        this.props.navigation.dispatch(loginAction);
      }
    );
  }

  render() {
    let menu = [
      { navigate: 'order', thumbnails: require('@thumbnails/home/Order.png'), title: ORDER },
      { navigate: 'contacts', thumbnails: require('@thumbnails/category/Contacts.png'), title: 'Đặt ngay' },
      { navigate: 'contacts', thumbnails: require('@thumbnails/category/Contacts.png'), title: 'Đặt ngay' },

    ]
    return (
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>Lịch giao đồ </Text>
          </CardItem>
          <CardItem bordered>
            <Calendar
              style={{width: '100%'}}
              monthFormat={'MM yyyy'}
              onMonthChange={(month) => { console.log('month changed', month) }}
              disableMonthChange={true}
              firstDay={1}
              hideDayNames={true}
              onPressArrowLeft={substractMonth => substractMonth()}
              onPressArrowRight={addMonth => addMonth()}
            />
          </CardItem>
        </Card>
        <View style={{ marginBottom: 5, marginTop: 5, display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
          {menu.map((e, key) =>
            <TouchableOpacity
              style={{ margin: 7, position: 'relative', borderWidth: 2, borderColor: '#d7e5e5', borderRadius: 15, padding: 10, alignItems: 'center' }}
              key={key}
              onPress={() => this.props.navigation.navigate(e.navigate, { preRoute: 'home' })}
            >
              <Image
                style={{ height: 75, width: 75 }}
                source={e.thumbnails}
              />
              <Text>{e.title}</Text>
            </TouchableOpacity>

          )}
        </View>
      </Content >
    )
  }
}
export default withNavigation(Dashboard);