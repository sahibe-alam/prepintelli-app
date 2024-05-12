import { StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../utils/commonStyle/colors';
import BackHeader from '../components/BackHeader';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import CircleProgress from '../components/commonComponents/CircleProgress';
import { fontSizes, spacing } from '../utils/commonStyle';
import Gradient from '../components/Gradient';
import { usePrepContext } from '../contexts/GlobalState';
import NoExamTarget from '../components/NoExamTarget';
const screenWidth = Dimensions.get('window').width;
interface PropsType {
  navigation?: any;
}
const MyPerformance: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const { user } = usePrepContext();
  const [subjectsPerformance, setSubjectsPerformance] = useState<any>([]);

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

  const data = {
    labels: dateArray,
    datasets: [
      {
        data: [20, 45, 28, 80, 120, 43, 20],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Last 7 days doubt cleared graph 😍'], // optional
  };
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    labelColor: () => colors.black,
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: colors.purple,
    },
    color: () => colors.light_purple,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    const subjectsArray = user?.exams[0]?.subjects?.map((item: any) => {
      return {
        name: item,
        progress: Math.floor(Math.random() * 100),
      };
    });

    setSubjectsPerformance(subjectsArray);
  }, [user]);
  return (
    <>
      {user?.exams.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <BackHeader
            onPress={() => navigation.goBack()}
            title="My exam performance"
          />
          <ScrollView>
            <LineChart
              data={data}
              horizontalLabelRotation={0}
              formatYLabel={(value) => value.slice(0, -3)}
              width={screenWidth}
              segments={6}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
            <View style={styles.resultWrapper}>
              <View style={{ flex: 1 }}>
                <Text style={styles.examName}>
                  Overall performance for {user?.exams[0]?.exam_short_name} exam
                </Text>
              </View>
              <View>
                <CircleProgress value={Math.floor(Math.random() * 100)} />
              </View>
            </View>
            <View style={styles.subjectWrapper}>
              <Text style={styles.subjectsHeading}>Subject wise score</Text>
              {subjectsPerformance?.map((item: any, index: number) => {
                return (
                  <View key={index} style={styles.subjectResult}>
                    <Text style={styles.subjectName}>{item.name}</Text>
                    <View style={styles.subjectProgress}>
                      <Gradient
                        style={
                          (styles.fillProgress, { width: `${item.progress}%` })
                        }
                      >
                        <Text numberOfLines={1} style={styles.percent}>
                          {item.progress}%
                        </Text>
                      </Gradient>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <NoExamTarget onPress={() => navigation.navigate('Home')} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  percent: {
    fontSize: fontSizes.p4,
    textAlign: 'center',
    color: colors.white,
  },
  fillProgress: {
    width: '40%',
    justifyContent: 'center',
    backgroundColor: colors.purple,
  },
  subjectProgress: {
    marginTop: 4,
    backgroundColor: colors.light_grey,
    borderRadius: 50,
    overflow: 'hidden',
  },
  subjectName: {
    fontSize: fontSizes.p2,
    color: colors.purple,
  },
  subjectResult: {
    padding: spacing.m,
    marginBottom: spacing.l,
    backgroundColor: colors.light_purple,
    borderRadius: 10,
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
  resultWrapper: {
    marginTop: spacing.xxl,
    marginHorizontal: spacing.l,
    backgroundColor: colors.light_blue,
    borderRadius: 10,
    gap: spacing.m,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.m,
  },
  test: {
    width: 50,
    height: 100,
    opacity: 0.2,
    backgroundColor: 'blue',
  },
  child: {
    width: 50,
    height: 80,
    backgroundColor: 'yellow',
  },

  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightBg,
  },
  screenName: {
    color: 'black',
  },
});
export default MyPerformance;
