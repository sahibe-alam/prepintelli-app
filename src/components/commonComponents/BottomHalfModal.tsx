import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../../utils/commonStyle/colors';
import { spacing } from '../../utils/commonStyle';

interface BottomHalfModalProps {
  children?: React.ReactNode;
  renderButton?: () => React.ReactNode;
  handleTogglePress: () => void;
  toggle: boolean;
  setToggle: any;
}

const BottomHalfModal: React.FC<BottomHalfModalProps> = ({
  children,
  toggle = false,
  setToggle,
}) => {
  // const [toggle, setToggle] = useState(false);

  // const handleTogglePress = () => {
  //   setToggle(!toggle);
  // };

  const handleOutsidePress = () => {
    setToggle(false);
  };

  const styles = getStyle();

  return (
    <View style={styles.container}>
      <Modal
        isVisible={toggle}
        onBackdropPress={handleOutsidePress}
        onSwipeComplete={handleOutsidePress}
        swipeDirection="down"
        style={styles.modal}
      >
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.modalContent}>
            <View style={styles.closeBtnWrapper}>
              <TouchableOpacity
                // onPress={handleTogglePress}
                style={styles.barCloseBtn}
                activeOpacity={0.7}
              />
            </View>
            <SafeAreaView>{children}</SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    closeBtnWrapper: {
      alignItems: 'center',
      marginBottom: 20,
    },
    barCloseBtn: {
      width: 60,
      height: 4,
      backgroundColor: colors.grey,
      borderRadius: 2,
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: colors.lightBg,
      padding: spacing.l,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    container: {
      position: 'relative',
    },
    dotsBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
    },
    dots: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
  });
};

export default BottomHalfModal;
