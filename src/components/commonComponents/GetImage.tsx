import React from 'react';
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

interface GetImageProps {
  onImagePicked: (imagePath: string) => void;
  cropping?: boolean;
  children: React.ReactNode;
}

const GetImage: React.FC<GetImageProps> = ({
  onImagePicked,
  cropping = false,
  children,
}) => {
  const getImagePath = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: cropping,
      cropperCircleOverlay: false,
      includeBase64: false,
    })
      .then((image) => {
        onImagePicked(image.path);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  return <TouchableOpacity onPress={getImagePath}>{children}</TouchableOpacity>;
};

export default GetImage;
