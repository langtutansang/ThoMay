import { PermissionsAndroid } from 'react-native';

export const checkReadContact = async  () => {
  try{
    let res = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
    return res === PermissionsAndroid.RESULTS.GRANTED
  }
  catch(error) {
    return error
  }
}

export const checkWriteContact = async  () => {
  try{
    let res = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
    return res === PermissionsAndroid.RESULTS.GRANTED
  }
  catch(error) {
    throw new Error(error);
  }
}

export const requestReadContact = async () => {
  try{
    let res = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    )
    return res === PermissionsAndroid.RESULTS.GRANTED
  }
  catch(error) {
    throw new Error(error);
  }
 
}
export const requestWriteContact = async () => {
  try{
    let res = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      {
        'title': 'Ứng dụng cần cấp quyền ghi Danh bạ',
        'message': 'Để lưu thông tin danh bạ, bạn cần cấp quyền ghi danh bạ cho ứng dụng này'
      }
    )
    return res === PermissionsAndroid.RESULTS.GRANTED
  }
  catch(error) {
    throw new Error(error);
  }
 
}