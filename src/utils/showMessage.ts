import { Platform, ToastAndroid } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export const useShowMessage = () => {
  const toast = useToast();

  const showMessage = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      // Use react-native-toast-notifications for iOS
      toast.show(message, {
        type: 'default',
        placement: 'bottom',
        duration: 3000,
        animationType: 'slide-in',
      });
    }
  };

  return showMessage;
};
