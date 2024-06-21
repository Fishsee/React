// TemperatureCard.tsx

import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

interface PotentialProblemCardProps {
  icon: ImageSourcePropType;
  problem: string;
  label: string;
  iconWidth?: number;
  iconHeight?: number;
}

const PotentialProblemCard: React.FC<PotentialProblemCardProps> = ({
  icon,
  problem,
  label,
  iconWidth = 25,
  iconHeight = 25,
}) => {
  return (
    <View style={styles.potentialProblem}>
      <View>
        <Image
          source={icon}
          style={[styles.image, { width: iconWidth, height: iconHeight }]}
        />
      </View>
      <View style={styles.potentialProblemText}>
        <Text style={styles.problemText}>{problem}</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  potentialProblem: {
    width: 150,
    height: 70,
    backgroundColor: '#fff',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCCCCC',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginLeft: 7,
  },
  potentialProblemText: {
    marginLeft: 10,
  },
  problemText: {
    fontSize: 18,
    color: '#000',
  },
  labelText: {
    color: '#A098AE',
  },
});

export default PotentialProblemCard;
