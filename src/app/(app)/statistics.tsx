import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import SensorStat from '@/components/sensor-stat';

const Statistics = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.chartContainer}>
          <SensorStat />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Statistics;
