import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProgressCardProps {
  percentage: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ percentage }) => {
  const getProgressColor = (percentage: number) => {
    if (percentage <= 20) {
      return '#FF0000'; // Red
    } else if (percentage <= 40) {
      return '#FFA500'; // Orange
    } else if (percentage <= 60) {
      return '#FFFF00'; // Yellow
    } else if (percentage <= 80) {
      return '#ADF151'; // GreenYellow
    } else {
      return '#27EA27'; // LimeGreen
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Voedsel</Text>
        <Text style={styles.title}>Uitstekend</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${percentage}%`,
                backgroundColor: getProgressColor(percentage),
              },
            ]}
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.labelText}>Slecht</Text>
          <Text style={styles.percentageText}>{percentage}%</Text>
          <Text style={styles.labelText}>Optimaal</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E3A5F',
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#888',
  },
  percentageText: {
    fontSize: 16,
    color: '#1E3A5F',
    marginHorizontal: 8,
  },
});

export default ProgressCard;
