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
  },
  img: {
    alignSelf: 'center',
    width: logoWidth,
    height: logoHeight,
  },
  formButton:{
    display:'flex',
    alignItems: 'center',
    marginTop: 15

  },
  buttonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    width:logoWidth - 40 ,
    borderRadius:5,
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },


  formInput:{
    height: 45,
    width: logoWidth,
    display:'flex',
    alignItems: 'center',
  },
  input:{
    height: 40,
    paddingLeft: 30,
    width: logoWidth - 40
  },
  icon: {
    position: 'absolute',
    zIndex: 99,
    left: 25,
    top: 10,
  },
  touchableOpacity:{
    marginTop:10,
    width: logoWidth,
    display: 'flex',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider:{
    width: logoWidth - 40    
  }, 
  ignoreLogin:{
    backgroundColor: "rgb(0, 102, 255)",
  }
});
