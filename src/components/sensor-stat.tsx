import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = ({ data, title }: { data: number[]; title: string }) => {
  const chartData = {
    labels: data.map((_, index) => (index + 1).toString()),
    datasets: [
      {
        data,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: [title],
  };

  return (
    <View>
      <Text style={styles.subHeader}>{title}</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#2179FF',
  backgroundGradientFrom: '#2179FF',
  backgroundGradientTo: '#2179FF',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#FFFFFF',
  },
};

const SensorStat = ({ data, title }: { data: number[]; title: string }) => {
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <Chart data={data} title={title} />
      ) : (
        <Text>No data available for {title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default SensorStat;
