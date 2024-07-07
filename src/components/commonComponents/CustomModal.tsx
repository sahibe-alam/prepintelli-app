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
import { spacing } from '../../utils/commonStyle';
import Gradient from '../Gradient';
import { colors } from '../../utils/commonStyle/colors';
interface Props {
  isModalVisible: boolean;
  children?: React.ReactNode;
  title?: string;
  isModalHide?: () => void;
  isFullHeight?: boolean;
  isForceModal?: boolean;
}

const CustomModal: React.FC<Props> = ({
  isModalVisible,
  children,
  isModalHide,
  isFullHeight = false,
  isForceModal = true,
}) => {
  const styles = getStyles(isFullHeight);
  const toggleModal = () => {
    if (isModalHide) {
      isModalHide();
    }
  };
  return (
    <Modal
      customBackdrop={
        <TouchableWithoutFeedback
          onPress={isForceModal ? toggleModal : () => {}}
        >
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      }
      style={styles.modalStyles}
      isVisible={isModalVisible}
    >
      <View style={styles.container}>
        <Gradient style={styles.gradient}>
          <View style={styles.contentWrapper}>
            {isForceModal && (
              <View style={styles.closeBtnWrapper}>
                <TouchableOpacity style={styles.closeBtn} onPress={toggleModal}>
                  <Image
                    style={styles.closeBtnIc}
                    source={require('../../assets/img/close_ic.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.scrollWrapper,
                !isForceModal && { paddingTop: 16 },
              ]}
            >
              <View style={styles.content}>{children}</View>
            </ScrollView>
          </View>
        </Gradient>
      </View>
    </Modal>
  );
};

const getStyles = (isFullHeight: boolean) =>
  StyleSheet.create({
    content: {
      flex: isFullHeight ? 1 : undefined,
    },
    gradient: {
      padding: 1,
      borderRadius: 16,
      overflow: 'hidden',
    },
    closeBtnWrapper: {
      width: '100%',
      backgroundColor: colors.white,
      alignItems: 'flex-end',
      position: 'absolute',
      zIndex: 1,
      paddingHorizontal: spacing.s,
    },
    scrollWrapper: {
      paddingHorizontal: spacing.s,
      paddingTop: 34,
      paddingBottom: spacing.l,
      position: 'relative',
      flex: isFullHeight ? 1 : undefined,
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
      borderRadius: 16,
      overflow: 'hidden',
      height: isFullHeight ? '100%' : undefined,
      backgroundColor: colors.lightBg,
    },
    modalStyles: {
      margin: 0,
      padding: spacing.m,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
      maxHeight: '80%',
      minHeight: isFullHeight ? '80%' : undefined,
      overflow: 'hidden',
    },
  });
export default CustomModal;
