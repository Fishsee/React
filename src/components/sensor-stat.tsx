import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface DataPoint {
  phValue: string;
}

interface ApiResponse {
  status: string;
  data: DataPoint[];
}

const SensorStat = () => {
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    fetch('https://fishsee.aeternaserver.net/api/all-PH/1', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer 122|K4FTqKaukRYGophXO1nlQQjUP44u9PAQO6xjvRid77f2f0df',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log('Raw data:', data); // Log the raw data

        if (!data || !data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid data format');
        }

        const lastFiveEntries = data.data
          .slice(-5)
          .map((entry) => {
            const value = parseFloat(entry.phValue);
            console.log(`Parsed value: ${value}`); // Log each parsed value

            // Ensure the number is finite and not NaN, otherwise default to zero
            return Number.isFinite(value) ? value : 0;
          })
          .filter((value) => value >= 0); // Ensure all values are non-negative and valid

        console.log('Processed last five entries:', lastFiveEntries); // Log the processed data

        if (
          lastFiveEntries.length === 0 ||
          lastFiveEntries.includes(NaN) ||
          lastFiveEntries.includes(Infinity) ||
          lastFiveEntries.includes(-Infinity)
        ) {
          throw new Error('Invalid data detected');
        }

        setChartData(lastFiveEntries);
      })
      .catch((error) => {
        console.error('There was an error fetching the pH data:', error);
      });
  }, []);

  const data = {
    labels: chartData.map((_, index) => (index + 1).toString()),
    datasets: [
      {
        data: chartData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['pH Values'], // optional
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>pH Sensor Data</Text>
      {chartData.length > 0 ? (
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>No data available</Text>
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SensorStat;
