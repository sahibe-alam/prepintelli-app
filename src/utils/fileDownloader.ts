import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';

export const fileDownloader = async (
  fileUrl: string,
  fileName?: string | null,
  fileType?: string
) => {
  const timeStamp = new Date().getTime(); // or any timestamp you prefer
  const file_Name = fileName || timeStamp;
  const path = `${
    Platform.OS === 'ios'
      ? RNFetchBlob.fs.dirs.DocumentDir
      : RNFetchBlob.fs.dirs.LegacyDownloadDir
  }/${file_Name}.${fileType || 'pdf'}`;

  try {
    if (fileUrl.startsWith('file://')) {
      // If fileUrl is a local file path
      // const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
      const sourcePath = fileUrl.substring(7); // Remove 'file://' prefix
      await RNFetchBlob.fs.cp(sourcePath, path); // Copy the file to the destination path
      return Promise.resolve(path);
    } else {
      // If fileUrl is an HTTP URL
      const response = await RNFetchBlob.config({
        path: path,
        fileCache: true,
      }).fetch('GET', fileUrl);

      return Promise.resolve(response.path()); // Return the downloaded file path
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    return null;
  }
};
