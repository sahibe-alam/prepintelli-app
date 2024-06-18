import { PermissionsAndroid } from 'react-native';

const requestMultipleHelper = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    PermissionsAndroid.PERMISSIONS.CAMERA,
    // ask mic permission
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  ]);

  return granted;
};

export default requestMultipleHelper;
