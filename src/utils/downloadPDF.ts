import { Alert, Platform } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
const downloadPDF = (fileName: string, fileUrl: string) => {
  const { config, fs } = RNBlobUtil;
  const DownloadDir = fs.dirs.LegacyDownloadDir; // For Android
  const DocumentDir = fs.dirs.DocumentDir; // For iOS

  const localFilePath = fileUrl.replace('file://', '');

  const targetPath =
    Platform.OS === 'ios'
      ? `${DocumentDir}/${fileName}`
      : `${DownloadDir}/${fileName}`;

  if (fileUrl.startsWith('file://')) {
    fs.cp(localFilePath, targetPath)
      .then(() => {
        if (Platform.OS === 'ios') {
          RNBlobUtil.ios.openDocument(targetPath);
        } else {
          Alert.alert(
            'Success',
            `PDF downloaded successfully to ${targetPath}!`
          );
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to copy PDF.');
        console.error(error);
      });
  } else {
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: targetPath,
        description: 'Downloading PDF.',
      },
      path: Platform.OS === 'ios' ? targetPath : undefined,
    };

    config(options)
      .fetch('GET', fileUrl)
      .then((res) => {
        if (Platform.OS === 'ios') {
          RNBlobUtil.ios.openDocument(res.path());
        } else {
          Alert.alert(
            'Success',
            `PDF downloaded successfully to ${targetPath}!`
          );
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to download PDF.');
        console.error(error);
      });
  }
};

export default downloadPDF;
