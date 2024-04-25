import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {spacing} from '../../utils/commonStyle';
import Gradient from '../Gradient';
import {colors} from '../../utils/commonStyle/colors';
interface Props {
  isModalVisible: boolean;
  children?: React.ReactNode;
  title?: string;
  isModalHide?: () => void;
}

const CustomModal: React.FC<Props> = ({
  isModalVisible,
  children,
  isModalHide,
}) => {
  const styles = getStyles();
  const toggleModal = () => {
    if (isModalHide) {
      isModalHide();
    }
  };
  return (
    <Modal
      customBackdrop={
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      }
      style={styles.modalStyles}
      isVisible={isModalVisible}>
      <View style={styles.container}>
        <Gradient>
          <View style={styles.contentWrapper}>
            <View style={styles.closeBtnWrapper}>
              <TouchableOpacity style={styles.closeBtn} onPress={toggleModal}>
                <Image
                  style={styles.closeBtnIc}
                  source={require('../../assets/img/close_ic.png')}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollWrapper}>
              <View>{children}</View>
            </ScrollView>
          </View>
        </Gradient>
      </View>
    </Modal>
  );
};

const getStyles = () =>
  StyleSheet.create({
    closeBtnWrapper: {
      width: '100%',
      backgroundColor: colors.white,
      alignItems: 'flex-end',
      position: 'absolute',
      zIndex: 1,
      borderRadius: 16,
      paddingHorizontal: spacing.s,
    },
    scrollWrapper: {
      paddingHorizontal: spacing.s,
      paddingTop: 34,
      paddingBottom: spacing.l,
      position: 'relative',
    },
    closeBtnIc: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
    },
    closeBtn: {
      width: 30,
      height: 30,
      marginLeft: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      top: 6,
      right: 6,
    },
    contentWrapper: {
      margin: 1.5,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.lightBg,
    },
    modalStyles: {
      margin: 0,
      padding: 0,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
      marginHorizontal: spacing.l,
      maxHeight: '90%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 16,
      overflow: 'hidden',
    },
  });
export default CustomModal;
