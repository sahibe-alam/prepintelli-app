import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { colors } from '../../utils/commonStyle/colors';
import { fontSizes } from '../../utils/commonStyle';
import RadioButton from '../RadioButton';
import Button from '../Button';
import { makeRequest } from '../../api/apiClients';
import { useToast } from 'react-native-toast-notifications';
import { usePrepContext } from '../../contexts/GlobalState';

const ReportPopUpUi = ({ isModalHide = () => {}, postId }: any) => {
  const styles = getStyle();
  const [message, setMessage] = React.useState('');
  const [checked, setChecked] = React.useState<any>();
  const [isReason, setIsReason] = React.useState(false);
  const { user } = usePrepContext();
  const toast = useToast();
  const radioList = [
    {
      label: 'Spam or Irrelevant Content',
      value: 'spam',
    },
    {
      label: 'Misinformation or Incorrect Advice',
      value: 'misinformation',
    },
    {
      label: 'Offensive or Inappropriate Content',
      value: 'offensive',
    },
    {
      label: 'Harassment or Bullying',
      value: 'harassment',
    },
    {
      label: 'Violation of Exam Community Rules',
      value: 'violation',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ];

  const createSpamReport = () => {
    if (checked?.value) {
      makeRequest({
        method: 'POST',
        url: '/create-spam-report',
        data: {
          userId: user?._id,
          postId: postId,
          message: message,
          reportLabel: checked?.label,
        },
      }).then(() => {
        toast.show('Reported Successfully', {
          type: 'default',
        });
        isModalHide();
      });
    } else {
      setIsReason(true);
    }
  };

  console.log(postId);
  return (
    <View>
      <Text style={styles.heading}>Report This Post</Text>
      <Text style={styles.textLabel}>Message (optional):</Text>
      <TextInput
        placeholderTextColor={colors.grey}
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
        multiline
        placeholder="Why are you reporting this post?"
      />
      <View style={{ marginTop: 20 }}>
        <RadioButton
          marginBottom={10}
          checked={checked?.value}
          radioList={radioList}
          onChecked={(item: any) => {
            setChecked(item);
            setIsReason(false);
          }}
        />
        {isReason && (
          <Text style={styles.textErr}> Please select a reason</Text>
        )}
      </View>
      <View style={styles.btnContainer}>
        <Button
          btnWidth={'45%'}
          outline={true}
          title={'Cancel'}
          onPress={isModalHide}
        />
        <Button onPress={createSpamReport} btnWidth={'45%'} title={'Submit'} />
      </View>
    </View>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    textErr: {
      color: colors.red,
      fontSize: fontSizes.p2,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    textLabel: {
      color: colors.black,
      fontSize: fontSizes.p2,
      paddingTop: 10,
      paddingBottom: 5,
    },
    textInput: {
      borderWidth: 1,
      borderColor: colors.grey,
      textAlignVertical: 'top',
      height: 100,
      borderRadius: 10,
      color: colors.black,
      padding: 10,
    },
    heading: {
      fontSize: fontSizes.h5,
      fontWeight: '600',
      color: colors.black,
      textAlign: 'center',
      paddingBottom: 10,
    },
  });
};
export default ReportPopUpUi;
