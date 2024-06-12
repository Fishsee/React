/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import SensorStat from '@/components/sensor-stat';
import useAuthToken from '@/hooks/useAuthToken';

interface DataState {
  data: number[];
  labels: string[];
}

const Stats = () => {
  const token = useAuthToken();
  const [phData, setPhData] = useState<DataState>({
    data: [],
    labels: [],
  });
  const [temperatureData, setTemperatureData] = useState<DataState>({
    data: [],
    labels: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchData = async (
      url: string,
      setData: React.Dispatch<React.SetStateAction<DataState>>,
      dataKey: string
    ) => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(
            `HTTP status ${response.status}: ${response.statusText}`
          );
        }
        const jsonData = await response.json();
        const labels = jsonData.data.map(
          (_: any, index: number) => `Sample ${index + 1}`
        );
        const data = jsonData.data.map((item: any) => {
          const value = parseFloat(item[dataKey]);
          return isNaN(value) ? 0 : value;
        });

        setData({ data, labels });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError('Failed to fetch data: ' + error.message);
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData(
      'https://fishsee.aeternaserver.net/api/all-PH/1',
      setPhData,
      'phValue'
    );
    fetchData(
      'https://fishsee.aeternaserver.net/api/all-temperature/1',
      setTemperatureData,
      'tempC'
    );
  }, [token]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>pH Values</Text>
      <SensorStat
        sensorName="PH Value"
        data={phData.data}
        labels={phData.labels}
        yAxisUnit="pH"
      />
      <Text style={styles.title}>Temperature Readings</Text>
      <SensorStat
        sensorName="Temperature"
        data={temperatureData.data}
        labels={temperatureData.labels}
        yAxisUnit="°C"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Stats;
