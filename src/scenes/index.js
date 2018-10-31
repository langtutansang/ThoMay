import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Auth from '@containers/Auth/auth-container'
import LoginContainer from '@containers/Auth/login-container'
import RegisterContainer from '@containers/Auth/register-container'
import ForgotPasswordContainer from '@containers/Auth/forgot-password-container'
import Content from '@components/Content/Content'
import { 
  Dashboard, 
  List, 
  Contacts, 
  ListContact, 
  AddContact, 
  Types,
  AddTypes,
  MeasuresTypes,
  MeasuresGroups,
  AddMeasuresGroups,
  PicTypes,
  Products,
  Order,
  MeasureCustomer,
  AddMeasureCustomer
  } from '@containers'

const Screen = (Child ) => (<Content><Child/></Content>)

const scenes = createStackNavigator( {
  auth: Auth,
  login: LoginContainer,
  register: RegisterContainer,
  forgotPassword: ForgotPasswordContainer,
  home: ()=>Screen(Dashboard),
  list: ()=>Screen(List),
  contacts: ()=>Screen(Contacts),
  listContacts: ()=>Screen(ListContact),
  addContacts: ()=>Screen(AddContact),
  types: ()=>Screen(Types),
  addTypes: ()=>Screen(AddTypes),
  measuresTypes: ()=>Screen(MeasuresTypes),
  measuresGroups: ()=>Screen(MeasuresGroups),
  addMeasuresGroups: ()=>Screen(AddMeasuresGroups),
  picTypes: ()=>Screen(PicTypes),
  products: ()=>Screen(Products),
  order: ()=>Screen(Order),
  measureCustomer: ()=>Screen(MeasureCustomer),
  addMeasureCustomer: ()=>Screen(AddMeasureCustomer),
  
},
{
  headerMode: 'none',
  initialRouteName: 'auth',
});

export default scenes;
