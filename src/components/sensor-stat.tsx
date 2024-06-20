import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface DataPoint {
  phValue: string;
}

interface ApiResponse {
  status: string;
  data: DataPoint[];
}

const fetchPHData = async (): Promise<number[]> => {
  try {
    const response = await fetch(
      'https://fishsee.aeternaserver.net/api/all-PH/1',
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer 122|K4FTqKaukRYGophXO1nlQQjUP44u9PAQO6xjvRid77f2f0df',
          'Content-Type': 'application/json',
        },
      }
    );
    const data: ApiResponse = await response.json();
    console.log('Raw data:', data);

    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format');
    }

    const lastFiveEntries = data.data
      .slice(-5)
      .map((entry) => {
        const value = parseFloat(entry.phValue);
        console.log(`Parsed value: ${value}`);
        return Number.isFinite(value) ? value : 0;
      })
      .filter((value) => value >= 0);

    console.log('Processed last five entries:', lastFiveEntries);

    if (
      lastFiveEntries.length === 0 ||
      lastFiveEntries.includes(NaN) ||
      lastFiveEntries.includes(Infinity) ||
      lastFiveEntries.includes(-Infinity)
    ) {
      throw new Error('Invalid data detected');
    }

    return lastFiveEntries;
  } catch (error) {
    console.error('There was an error fetching the pH data:', error);
    return [];
  }
};

const Chart = ({ data }: { data: number[] }) => {
  const chartData = {
    labels: data.map((_, index) => (index + 1).toString()),
    datasets: [
      {
        data,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['pH Values'],
  };

  return (
    <LineChart
      data={chartData}
      width={Dimensions.get('window').width - 16}
      height={220}
      chartConfig={{
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
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

const SensorStat = () => {
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPHData();
      setChartData(data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>pH Sensor Data</Text>
      {chartData.length > 0 ? (
        <Chart data={chartData} />
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
