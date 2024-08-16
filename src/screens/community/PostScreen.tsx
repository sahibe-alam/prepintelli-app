import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils/commonStyle/colors';
import BackHeader from '../../components/BackHeader';
import Images from '../../resources/Images';
import Gradient from '../../components/Gradient';
import { fontSizes, spacing } from '../../utils/commonStyle';
import GetImage from '../../components/commonComponents/GetImage';
import { makeRequest } from '../../api/apiClients';
import { usePrepContext } from '../../contexts/GlobalState';
import ThreePulseDots from '../../components/commonComponents/ThreePulseDots';
import { useToast } from 'react-native-toast-notifications';

const PostScreen = ({ navigation, route }: PostScreenPropsType) => {
  const { image } = route.params || {};
  const styles = getStyles();
  const [text, setText] = useState('');
  const [renderImage, setRenderImage] = useState('');
  const { user } = usePrepContext();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const postShareHandler = () => {
    if (text.trim() !== '' || renderImage !== '') {
      setLoading(true);
      const formDataPost = new FormData();
      formDataPost.append('content', text);
      if (renderImage !== '') {
        formDataPost?.append('postImage', {
          uri: renderImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }
      formDataPost.append('examId', user?.exams[0]?.examId);
      formDataPost.append('userId', user?._id);
      makeRequest({
        method: 'POST',
        url: '/share-post',
        data: formDataPost,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          setLoading(false);
          navigation.goBack();
          setRenderImage('');
          setText('');
          toast.show(
            `Posted Successfully 😍 in ${user?.exams[0]?.exam_short_name} community`,
            {
              type: 'default',
            }
          );
        })
        .catch((err: any) => {
          console.log(err, 'err hai');
          setLoading(false);
          toast.show('Something went wrong', { type: 'danger' });
        });
    } else {
      toast.show('Post cannot be empty', { type: 'default' });
    }
  };

  useEffect(() => {
    if (image) {
      setRenderImage(image);
    }
  }, [image]);
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
        title="Post"
      />
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Write something..."
          multiline
          placeholderTextColor={colors.grey}
          onChangeText={(text) => setText(text)}
          value={text}
        />
      </View>
      <View style={styles.postWrapper}>
        {renderImage && (
          <View style={styles.postImageWrapper}>
            <Image style={styles.postImage} source={{ uri: renderImage }} />
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
          </View>
        )}
      </View>
      <View style={styles.postFooter}>
        <View style={styles.postActions}>
          <GetImage onImagePicked={(path: string) => setRenderImage(path)}>
            <Image source={Images.imageIc} resizeMode="contain" />
          </GetImage>
          {/* <TouchableOpacity>
            <Image source={Images.pdfIc2} resizeMode="contain" />
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={postShareHandler}>
          <Gradient
            style={{
              padding: spacing.s,
              borderRadius: 100,
              width: 110,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isLoading ? (
              <ThreePulseDots color="white" />
            ) : (
              <Text
                style={{
                  color: colors.white,
                  fontSize: fontSizes.p2,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Post
              </Text>
            )}
          </Gradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

type PostScreenPropsType = {
  navigation?: any;
  route?: any;
};
const getStyles = () => {
  return StyleSheet.create({
    closeIc: {
      width: 26,
      height: 26,
      resizeMode: 'contain',
    },
    textInputWrapper: {
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.l,
      flex: 1,
    },
    postWrapper: {
      paddingHorizontal: spacing.l,
    },
    closeBtn: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: colors.white,
      borderRadius: 100,
    },
    textInput: {
      fontSize: fontSizes.p2,
      color: colors.black,
    },
    postImage: {
      width: '100%',
      borderRadius: 10,
      height: '100%',
      resizeMode: 'cover',
    },
    postImageWrapper: {
      width: '50%',
      position: 'relative',
      aspectRatio: 1 / 1,
    },
    postActions: {
      flexDirection: 'row',
      gap: spacing.xl,
      alignItems: 'center',
    },
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.l,
      backgroundColor: colors.white,
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBg,
    },
  });
};
export default PostScreen;
