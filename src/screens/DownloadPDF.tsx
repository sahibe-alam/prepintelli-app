import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const DownloadPDF = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        downloadPDF();
      } else {
        Alert.alert(
          'Permission Denied',
          'Storage permission is required to download files android.'
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestIOSPermission = async () => {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
    if (result === RESULTS.GRANTED) {
      setPermissionGranted(true);
      downloadPDF();
    } else {
      Alert.alert(
        'Permission Denied',
        'Storage permission is required to download files.'
      );
    }
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      requestAndroidPermission();
    } else if (Platform.OS === 'ios') {
      requestIOSPermission();
    }
  };

  const downloadPDF = () => {
    const pdfUrl = 'https://www.example.com/sample.pdf';
    const { config, fs } = RNBlobUtil;
    const DownloadDir = fs.dirs.DownloadDir; // For Android
    const DocumentDir = fs.dirs.DocumentDir; // For iOS

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${DownloadDir}/sample.pdf`,
        description: 'Downloading PDF.',
      },
      path: Platform.OS === 'ios' ? `${DocumentDir}/sample.pdf` : undefined,
    };

    config(options)
      .fetch('GET', pdfUrl)
      .then((res) => {
        if (Platform.OS === 'ios') {
          RNBlobUtil.ios.openDocument(res.path());
        } else {
          Alert.alert(
            'Success',
            'PDF downloaded successfully to Download folder!'
          );
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to download PDF.');
        console.error(error);
      });
  };

  return (
    <View>
      <Button title="Download PDF" onPress={requestPermission} />
    </View>
  );
};

export default DownloadPDF;
