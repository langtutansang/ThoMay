import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import Auth from '@containers/Auth/auth-container'
import LoginContainer from '@containers/Auth/login-container'
import RegisterContainer from '@containers/Auth/register-container'
import ForgotPasswordContainer from '@containers/Auth/forgot-password-container'
import Content from '@components/Content/Content'
import { Dashboard, List, Contacts, ListContact } from '@containers'

// import { TITLE_HOME, TITLE_CATEGORY} from '@constants/title'
// const scenes = Actions.create(
//   <Stack key="root" hideNavBar>
//       {/* auth */}
//       <Scene key='auth' component={Auth} title='Auth' />
//       <Scene key='login' component={LoginContainer} title='Login' />
//       <Scene key='register' component={RegisterContainer} title='Register' />
//       <Scene key='forgotPassword' component={ForgotPasswordContainer} title='ForgotPassword' />
//       {/* menu */}
//       <Scene key="home" title={ TITLE_HOME } component={ Content } contentChild={ Home } />
//       <Scene key="list" title={ TITLE_CATEGORY } component={ Content } contentChild={ List }/>
//       {/* list */}
//       <Scene key="contacts" title="Liên Hệ" component={ Content }  contentChild={ Contacts }/>
//   </Stack>
// );

const Screen = (Child ) => (<Content><Child/></Content>)

const scenes = createStackNavigator( {
  auth: Auth,
  login: LoginContainer,
  register: RegisterContainer,
  forgotPassword: ForgotPasswordContainer,
  home: ()=>Screen(Dashboard),
  list: ()=>Screen(List),
  contacts: ()=>Screen(Contacts),
  listContacts: gestureHandlerRootHOC(()=>Screen(ListContact))
},
{
  headerMode: 'none',
  initialRouteName: 'auth',
});

export default scenes;
