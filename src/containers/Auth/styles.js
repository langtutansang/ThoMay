import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
let [logoWidth, logoHeight] = [width *0.8, height * 0.45];
export default StyleSheet.create({
  indicator:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
