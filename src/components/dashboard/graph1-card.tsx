import { MaterialIcons } from '@expo/vector-icons'; // Example icon library
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

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
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#4A90E2',
  },
};

const DashboardCard: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.headerText}>
            Hallo Bram, bekijk de conditie van je aquarium
          </Text>
          <LineChart
            data={data}
            width={screenWidth - 65} // Adjust width to fit within the card
            height={100}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MaterialIcons name="water-drop" size={24} color="white" />
              <Text style={styles.infoText}>pH</Text>
              <Text style={styles.infoValue}>6.2</Text>
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

          <View />
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
    width: 380,
    height: 250, // Increased height to accommodate the chart
  },
  headerText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 20,
    paddingLeft: 25,
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
    fontSize: 16,
    marginLeft: 5,
  },
  infoValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  selectedValueText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});

export default DashboardCard;
