import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { fontSizes, spacing } from '../../utils/commonStyle';
import Images from '../../resources/Images';
import { colors } from '../../utils/commonStyle/colors';
import GetImage from '../commonComponents/GetImage';
import { usePrepContext } from '../../contexts/GlobalState';
import { makeRequest } from '../../api/apiClients';
import { useToast } from 'react-native-toast-notifications';

interface CommentActionProps {
  inputValue: string;
  setRenderImage: (path: string) => void;
  styles: any;
  renderImage: string;
  onPostComment: () => void;
}

const CommentAction: React.FC<CommentActionProps> = ({
  inputValue,
  setRenderImage,
  styles,
  renderImage,
  onPostComment,
}) => {
  return (
    <View style={styles.actionWrapper}>
      <GetImage onImagePicked={(path: string) => setRenderImage(path)}>
        <Image
          style={{ width: 32, height: 32 }}
          source={Images.imageIc}
          resizeMode="contain"
        />
      </GetImage>
      <TouchableOpacity
        onPress={() => onPostComment()}
        style={[
          styles.sentBtn,
          {
            backgroundColor:
              inputValue.trim() !== '' || renderImage
                ? colors.blue
                : colors.grey,
          },
        ]}
      >
        <Image style={styles.sentIcon} source={Images.sentIcon} />
      </TouchableOpacity>
    </View>
  );
};

interface CommentInputProps {
  onInputChange?: (value: string) => void;
  item: any;
}

interface CommentInputHandle {
  focus: () => void;
}

const CommentInput = forwardRef<CommentInputHandle, CommentInputProps>(
  ({ onInputChange, item }, ref) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [renderImage, setRenderImage] = useState<string>('');
    const inputRef = useRef<TextInput>(null);
    const { user } = usePrepContext();
    const toast = useToast();
    const styles = getStyle(inputValue);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const handleInput = (text: string) => {
      setInputValue(text);
      if (onInputChange) {
        onInputChange(text);
      }
    };

    const postComment = async () => {
      const formData = new FormData();
      formData.append('comment', inputValue.trim());
      formData.append('userId', user?._id);
      formData.append('postId', item?._id);
      if (renderImage) {
        formData.append('commentImage', {
          uri: renderImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        } as any);
      }
      if (inputValue.trim() || renderImage) {
        makeRequest({
          method: 'POST',
          url: '/post-comment',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(() => {
            setInputValue('');
            setRenderImage('');
            onInputChange && onInputChange('');
          })
          .catch((err) => {
            console.log(err?.data, 'err');
            toast.show('Something went wrong', { type: 'danger' });
          });
      } else {
        toast.show('Comment cannot be empty', { type: 'default' });
      }
    };

    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: inputValue ? 'column' : 'row',
            paddingBottom: inputValue !== '' || renderImage ? 10 : 0,
          },
        ]}
      >
        {renderImage && (
          <View style={styles.imageWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeBtn}
              onPress={() => setRenderImage('')}
            >
              <Image
                style={styles.closeIc}
                source={Images.redCloseIc}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image style={styles.image} source={{ uri: renderImage }} />
          </View>
        )}
        <TextInput
          ref={inputRef}
          style={[styles.input, { flex: inputValue ? 0 : 1 }]}
          onChangeText={handleInput}
          value={inputValue}
          placeholder="Add a comment"
          placeholderTextColor={colors.grey}
        />
        <CommentAction
          renderImage={renderImage}
          inputValue={inputValue}
          setRenderImage={setRenderImage}
          styles={styles}
          onPostComment={postComment}
        />
      </View>
    );
  }
);

const getStyle = (inputValue: string) => {
  return StyleSheet.create({
    closeIc: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    closeBtn: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: colors.white,
      borderRadius: 100,
      zIndex: 2,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 10,
    },
    imageWrapper: {
      width: 80,
      aspectRatio: 1,
      position: 'absolute',
      top: -82,
      left: 10,
    },
    input: {
      flex: 1,
      width: '100%',
      color: colors.black,
      fontSize: fontSizes.p3,
    },
    sentIcon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: colors.white,
    },
    sentBtn: {
      width: 32,
      height: 32,
      borderRadius: 50,
      padding: 6,
      backgroundColor: colors.grey,
    },
    container: {
      paddingHorizontal: spacing.l,
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      position: 'relative',
    },
    actionWrapper: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: inputValue ? 1 : 0,
      padding: inputValue ? spacing.l : 0,
    },
  });
};

export default CommentInput;
