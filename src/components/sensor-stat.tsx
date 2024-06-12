import React from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SensorStat = ({ sensorName, data, labels, yAxisUnit }) => {
  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 255, 56, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  if (data.length === 0) return <Text>No data available</Text>;

  return (
    <ScrollView>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              label: sensorName,
              data: data,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8 }}
        yAxisLabel={yAxisUnit || 'Value'}
      />
    </ScrollView>
  );
};

export default SensorStat;
