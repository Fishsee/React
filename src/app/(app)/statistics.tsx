import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import SensorStat from '@/components/sensor-stat';
import useAuthToken from '@/hooks/useAuthToken';
import UserContext from '@/contexts/user-context';
import { ArrowLeft } from '@/ui/icons';
import { router } from 'expo-router';

interface DataPoint {
  phValue?: string;
  turbidity?: string;
  flow_rate?: string;
  waterLevelValue?: string;
  temperatureValue?: string;
  distanceValue?: string;
  light_level?: string;
}

interface ApiResponse {
  status: string;
  data: DataPoint[];
}

const fetchData = async (
  url: string,
  token: string,
  key: keyof DataPoint
): Promise<number[]> => {
  try {
    console.log(`Fetching data from ${url} with token ${token}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const json: ApiResponse = await response.json();
    if (!json || !json.data || !Array.isArray(json.data)) {
      throw new Error('Invalid data format');
    }
    return json.data
      .slice(-5)
      .map((entry) => parseFloat(entry[key]))
      .filter(Number.isFinite);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
};

const Statistics = () => {
  const token = useAuthToken();
  const { userName } = useContext(UserContext);
  const aquariumId = '1';

  const [dataSets, setDataSets] = useState({
    phData: [],
    turbidityData: [],
    streamData: [],
    waterLevelData: [],
    temperatureData: [],
    distanceData: [],
    lightLevelData: [],
  });
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!aquariumId) {
      console.log('Missing required information:', { aquariumId });
      return;
    }

    if (!token) {
      console.log('Missing token');
      setLoading(false);
      return;
    }

    const urls = {
      ph: `https://fishsee.aeternaserver.net/api/all-PH/${aquariumId}`,
      turbidity: `https://fishsee.aeternaserver.net/api/all-troebelheid/${aquariumId}`,
      stream: `https://fishsee.aeternaserver.net/api/all-stroming/${aquariumId}`,
      waterLevel: `https://fishsee.aeternaserver.net/api/all-waterlevel/${aquariumId}`,
      temperature: `https://fishsee.aeternaserver.net/api/all-temperature/${aquariumId}`,
      distance: `https://fishsee.aeternaserver.net/api/all-distance/${aquariumId}`,
      lightLevel: `https://fishsee.aeternaserver.net/api/all-light-level/${aquariumId}`,
    };
    const keys = {
      ph: 'phValue',
      turbidity: 'turbidity',
      stream: 'flow_rate',
      waterLevel: 'water_level',
      temperature: 'tempC',
      distance: 'distance_cm',
      lightLevel: 'light_level',
    };

    const fetchAllData = async (retry = false) => {
      setLoading(true);

      try {
        const fetchPromises = Object.entries(urls).map(([key, url]) =>
          fetchData(url, token, keys[key as keyof DataPoint]).then((data) => ({
            key: `${key}Data`,
            data,
          }))
        );

        const results = await Promise.all(fetchPromises);

        setDataSets(
          results.reduce((acc, { key, data }) => ({ ...acc, [key]: data }), {})
        );

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        if (!retry) {
          console.log('Retrying fetch...');
          setTimeout(() => {
            setAttempt((prev) => prev + 1);
          }, 2000);
        } else {
          setLoading(false);
        }
      }
    };

    fetchAllData(attempt > 0);
  }, [token, userName, aquariumId, attempt]);

  if (!aquariumId) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Waiting for user information...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading data...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View className="flex-1 px-4 pb-56">
          <View className="flex flex-row items-center justify-center">
            <ArrowLeft
              className="absolute left-0 mr-2"
              style={{ position: 'absolute', left: 0 }}
              onPress={() => {
                router.replace('/');
              }}
            />
            <Text className="text-xl font-semibold">Statestieken</Text>
          </View>
        </View>
        {!token ? (
          <Text style={styles.errorText}>
            No token available, data cannot be fetched.
          </Text>
        ) : (
          <View style={styles.chartContainer}>
            {Object.entries(dataSets).map(([key, data]) => (
              <SensorStat
                key={key}
                data={data}
                title={`${key.replace('Data', '')} Values`}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scrollView: {
    width: '100%',
    marginHorizontal: 20,
  },
  userNameText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Statistics;
