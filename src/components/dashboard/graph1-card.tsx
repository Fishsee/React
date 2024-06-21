import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import useAuthToken from '@/hooks/useAuthToken';
import UserContext from '@/contexts/user-context';

const screenWidth = Dimensions.get('window').width;

const DashboardCard: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [aquariumId, setAquariumId] = useState('');
  const [phValue, setPhValue] = useState('');
  const token = useAuthToken();

  const MyComponent = () => {
    const { userName } = useContext(UserContext);

    return (
      <View>
        <Text>Welcome, {userName}!</Text>
      </View>
    );
  };

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            'https://fishsee.aeternaserver.net/api/user',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          const data = await response.json();
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          setUserName(data.user.name);
          setAquariumId(data.aquarium_id);
          console.log('User data response:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    if (token && aquariumId) {
      const fetchPhValue = async () => {
        try {
          const url = `https://fishsee.aeternaserver.net/api/last-PH/${aquariumId}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch PH value');
          }

          const data = await response.json();
          setPhValue(data.data.phValue);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchPhValue();
    }
  }, [token, aquariumId]);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [6.2, 6.5, 6.8, 7.0, 7.2, 7.4],
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#2179FF',
    backgroundGradientTo: '#2179FF',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4A90E2',
    },
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.headerText}>
          {userName
            ? `Hallo ${userName}, bekijk de conditie van je aquarium`
            : 'Loading...'}
        </Text>
        <LineChart
          data={data}
          width={screenWidth - 45}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialIcons name="water-drop" size={24} color="white" />
            <Text style={styles.infoText}>pH</Text>
            <Text style={styles.infoValue}>
              {phValue ? `: ${phValue}` : 'Loading...'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="opacity" size={24} color="white" />
            <Text style={styles.infoText}>5 NTU</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="autorenew" size={24} color="white" />
            <Text style={styles.infoText}>Goed</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#2179FF',
    borderRadius: 15,
    paddingBottom: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 20,
    paddingLeft: 10,
  },
  content: {
    position: 'relative',
  },
  chart: {
    borderRadius: 8,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 5,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default DashboardCard;
