import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/commonStyle/colors';
import BackHeader from '../components/BackHeader';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import CircleProgess from '../components/commonComponents/CircleProgess';
import {fontSizes, spacing} from '../utils/commonStyle';
const screenWidth = Dimensions.get('window').width;
interface PropsType {
  navigation?: any;
}
const MyPerformance: React.FC<PropsType> = props => {
  const {navigation} = props;
  // Create a function to get the date in the format '2 Mar'
  function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});
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
      stroke: colors.purle,
    },
    color: () => colors.light_purple,

    strokeWidth: 2, // optional, default 3

    useShadowColorFromDataset: false, // optional
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader onPress={() => navigation.goBack()} title="Test Result" />
      <LineChart
        data={data}
        horizontalLabelRotation={0}
        formatYLabel={value => value.slice(0, -3)}
        width={screenWidth}
        segments={6}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
      <View style={styles.resultWrapper}>
        <View style={{flex: 1}}>
          <Text style={styles.examName}>
            Overall performance for [xyz] exam
          </Text>
        </View>
        <View>
          <CircleProgess />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  examName: {
    fontSize: fontSizes.p2,
    fontWeight: '500',
    color: colors.black,
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
