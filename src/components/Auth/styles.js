import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
let logoWidth = width - 20;
let logoHeight = height - 20;
export default StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    height: "100%",
    width: "100%"
  },
  img: {
    width: 340,
    height:450
  },
  touchableOpacity:{
    paddingTop:10
  }
});
