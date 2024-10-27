import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { makeRequest } from '../api/apiClients';
import GetImage from '../components/commonComponents/GetImage';
// import { socket } from '../utils/socketUtil';
import { io } from 'socket.io-client';

// Initialize socket
const socket = io('http://localhost:4000');
const Test: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!imageUri || !imageType || !imageName) {
      console.log('No image selected or image details missing');
      return;
    }

    const formData = new FormData();
    formData.append('thumbnail', {
      uri: imageUri,
      type: imageType, // Dynamic type based on the image
      name: imageName, // Dynamic name based on the image
    });

    try {
      makeRequest({
        method: 'POST',
        url: '/share-post',
        data: formData,
      });
    } catch (error) {
      console.log('Upload failed:', error);
    }
  };

  const getImagePath = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: false,
      cropperCircleOverlay: false,
      includeBase64: false,
    })
      .then((image) => {
        setImageUri(image.path);
        setImageType(image.mime); // Extract MIME type
        setImageName(image.filename || 'photo.jpg'); // Extract file name or default
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const [getMsg, setGetMsg] = useState('');

  useEffect(() => {
    // Log connection status
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.emit('message', 'Hello,   dd server!');

    socket.on('message', (data) => {
      console.log('Received blogs ss from server:', data);
      setGetMsg(data.blogs);
    });

    return () => {
      socket.off('message');
      socket.off('connect');
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{getMsg}</Text>
      <GetImage onImagePicked={(path: string) => console.log(path, 'sample')}>
        <Text>Upload</Text>
      </GetImage>
      <View style={styles.imageContainer}>
        <Button title="Select Image" onPress={getImagePath} />
        {imageUri && (
          <>
            <Image style={styles.image} source={{ uri: imageUri }} />
            <Button title="Upload Image" onPress={handleUpload} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  imageContainer: ViewStyle;
  image: ImageStyle;
}>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
  },
});

export default Test;
