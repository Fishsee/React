import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WaterQualityProps {
  title: string;
  index: number;
}

const WaterQuality: React.FC<WaterQualityProps> = ({ title, index }) => {
  // Constrain index between 0 and 1
  const constrainedIndex = Math.min(1, Math.max(0, index));

  // Add padding to the index position to keep the triangle away from the edges
  const adjustedIndex = constrainedIndex * 0.9 + 0.05;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Conditie</Text>
        <Text style={styles.headerText}>Index</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.index}>{constrainedIndex.toFixed(1)}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>Slecht</Text>
        <View style={styles.slider}>
          <View style={[styles.marker, { left: `${adjustedIndex * 100}%` }]}>
            <View style={styles.triangle} />
          </View>
        </View>
        <Text style={styles.sliderText}>Goed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F7FE',
    borderRadius: 8,
    width: '97%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  index: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderText: {
    flex: 1,
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
  },
  slider: {
    flex: 4,
    height: 4,
    backgroundColor: '#000',
    position: 'relative',
  },
  marker: {
    position: 'absolute',
    top: -8,
    marginLeft: -8, // Offset by half the width of the triangle to center it
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: '#000',
  },
});

export default WaterQuality;
