import { StackActions, NavigationActions } from 'react-navigation';

const navigateReset = (navigation, routeName, index = 0) => {

  const action = StackActions.reset({
    index,
    actions: [NavigationActions.navigate({ routeName })],
    
  });
  navigation.dispatch(action);
}
export default navigateReset