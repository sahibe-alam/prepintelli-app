import { StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native';
import React, { useCallback } from 'react';
import { colors } from '../utils/commonStyle/colors';
import BackHeader from '../components/BackHeader';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import CircleProgress from '../components/commonComponents/CircleProgress';
import { fontSizes, spacing } from '../utils/commonStyle';
import Gradient from '../components/Gradient';
import { usePrepContext } from '../contexts/GlobalState';
import NoExamTarget from '../components/NoExamTarget';
import { makeRequest } from '../api/apiClients';
import { useFocusEffect } from '@react-navigation/native';
import ThreePulseDots from '../components/commonComponents/ThreePulseDots';
import PopOverTooltip from '../components/commonComponents/PopOverTooltip';

const screenWidth = Dimensions.get('window').width;

interface PropsType {
  navigation?: any;
}

const MyPerformance: React.FC<PropsType> = ({ navigation }) => {
  const { user, userPerformance, setUserPerformance } = usePrepContext();
  // Create a function to get the date in the format '2 Mar'
  function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  }

  const dateArray: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date: Date = new Date();
    date.setDate(date.getDate() - i);
    dateArray.push(formatDate(date));
  }

  function getLast7DaysData(doubtCount: any) {
    const result = [];
    const today = new Date();

    // Helper function to format date as YYYY-MM-DD
    function formatDate(date: Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // Generate last 7 days data
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = formatDate(date);

      // Check if the date exists in the doubtCount object
      if (doubtCount[formattedDate] !== undefined) {
        result.push(doubtCount[formattedDate]);
      } else {
        result.push(0);
      }
    }

    return result;
  }
  const data = {
    labels: dateArray,
    datasets: [
      {
        data: getLast7DaysData(userPerformance?.doubtCount || {}),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Last 7 days doubt cleared graph 😍'],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,

    labelColor: () => colors.black,
    propsForDots: {
      r: '2',
      strokeWidth: '1',
      stroke: colors.purple,
    },
    color: () => colors.light_purple,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontSize: 9, // Adjust the font size for the x and y axis labels
    },
    paddingLeft: 0,
  };

  useFocusEffect(
    useCallback(() => {
      setUserPerformance?.(null);
      const fetchPerformance = async () => {
        try {
          const response: any = await makeRequest({
            method: 'POST',
            url: '/get-performance-score',
            data: { userId: user?._id },
          });

          if (response.data?.success) {
            setUserPerformance?.(response.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchPerformance();

      return () => {
        // Cleanup if needed
      };
    }, [user, setUserPerformance])
  );

  const calculatePercentage = (
    correctAnswers: number,
    totalQuestions: number
  ): string => {
    if (totalQuestions === 0) {
      return '0'; // Avoid division by zero and ensure the format without decimal places
    }
    let percentage = (correctAnswers / totalQuestions) * 100;
    // Check if the percentage is a whole number
    if (Number.isInteger(percentage)) {
      return percentage.toString(); // Return without decimal places
    }
    return percentage.toFixed(2).toString(); // Return with two decimal places
  };
  const totals = userPerformance?.subjectScore.reduce(
    (acc: any, current: any) => {
      acc.score += current.score;
      acc.totalQuestions += current.totalQuestions;
      return acc;
    },
    { score: 0, totalQuestions: 0 }
  );
  return (
    <>
      {user?.exams?.length === 1 ? (
        <>
          {userPerformance ? (
            <SafeAreaView style={styles.container}>
              <BackHeader
                onPress={() => navigation.goBack()}
                title="My exam performance"
              />
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.chartWrapper}>
                  <LineChart
                    data={data}
                    style={{
                      margin: 8,

                      borderRadius: 10,
                      marginVertical: 20,
                    }}
                    horizontalLabelRotation={0}
                    formatYLabel={(value) => value.slice(0, -3)}
                    width={screenWidth}
                    segments={6}
                    height={200}
                    chartConfig={chartConfig}
                    bezier
                  />
                  <View style={styles.infoWrapper}>
                    <PopOverTooltip content="This shows the total number of doubts you have asked and cleared with the AI chatbot. It helps you keep track of your interactions and learning progress." />
                  </View>
                </View>

                <View style={styles.resultWrapper}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.examName}>
                      Overall performance for{' '}
                      {user?.exams[0]?.exam_short_name ||
                        user?.exams[0].classname}{' '}
                      exam
                    </Text>
                  </View>
                  <View style={{ paddingRight: 16 }}>
                    <CircleProgress
                      value={
                        Number(
                          calculatePercentage(
                            totals.score,
                            totals.totalQuestions
                          )
                        ) || 0
                      }
                    />
                  </View>
                  <View style={styles.infoWrapperOverall}>
                    <PopOverTooltip
                      iconStyle={{ tintColor: colors.blue }}
                      content="This is your cumulative score across all subjects based on the tests you have taken. It provides a comprehensive view of your overall performance and readiness for the exam."
                    />
                  </View>
                </View>
                <View style={styles.subjectWrapper}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: 16,
                    }}
                  >
                    <Text style={styles.subjectsHeading}>
                      Subject wise score
                    </Text>
                    <View>
                      <PopOverTooltip content="This score represents your performance in each subject based on the tests you have attempted. It gives you a detailed breakdown of your strengths and areas for improvement in each subject." />
                    </View>
                  </View>
                  {userPerformance.subjectScore.map(
                    (item: any, index: number) => {
                      const widthPercentage: any = calculatePercentage(
                        item.score,
                        item.totalQuestions
                      );
                      return (
                        <View key={index} style={styles.subjectResult}>
                          <Text style={styles.subjectName}>{item.subject}</Text>
                          <View style={styles.subjectProgress}>
                            <Gradient
                              style={[
                                styles.fillProgress,
                                { width: `${widthPercentage}%` },
                              ]}
                            >
                              <Text numberOfLines={1} style={styles.percent}>
                                {calculatePercentage(
                                  item?.score,
                                  item?.totalQuestions
                                )}
                                %
                              </Text>
                            </Gradient>
                          </View>
                        </View>
                      );
                    }
                  )}
                </View>
              </ScrollView>
            </SafeAreaView>
          ) : (
            <View style={styles.noPerformanceLoader}>
              <ThreePulseDots color={colors.blue} />
            </View>
          )}
        </>
      ) : (
        <>
          <NoExamTarget onPress={() => navigation.navigate('Home')} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  infoWrapper: {
    position: 'absolute',
    top: 24,
    right: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartWrapper: {
    backgroundColor: colors.light_blue,
    position: 'relative',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  noPerformanceLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBg,
  },
  noPerformanceText: {
    textAlign: 'center',
    fontSize: fontSizes.p,
    paddingHorizontal: spacing.l,
  },
  noPerformance: {
    flex: 1,
    backgroundColor: colors.lightBg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.l,
  },
  percent: {
    fontSize: fontSizes.p4,
    textAlign: 'center',
    color: colors.white,
  },
  fillProgress: {
    justifyContent: 'center',
    backgroundColor: colors.purple,
  },
  subjectProgress: {
    marginTop: 4,
    backgroundColor: colors.white,

    borderRadius: 50,
    overflow: 'hidden',
  },
  subjectName: {
    fontSize: fontSizes.p2,
    color: colors.purple,
    paddingBottom: 6,
    textTransform: 'capitalize',
  },
  subjectResult: {
    padding: spacing.m,
    marginBottom: spacing.l,
    backgroundColor: colors.light_purple,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f3d9ff',
  },
  subjectsHeading: {
    fontSize: fontSizes.p,
    fontWeight: '500',
    color: colors.black,
  },
  subjectWrapper: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.l,
  },
  examName: {
    fontSize: fontSizes.p2,
    fontWeight: '500',
    color: colors.blue,
  },
  infoWrapperOverall: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  resultWrapper: {
    marginTop: spacing.xxl,
    marginHorizontal: spacing.l,
    backgroundColor: colors.light_blue,
    borderRadius: 10,
    gap: spacing.m,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
    padding: spacing.m,
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightBg,
  },
});

export default MyPerformance;
