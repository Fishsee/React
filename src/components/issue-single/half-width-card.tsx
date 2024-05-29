import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/ui';

interface HalfWidthCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onWhyPress: () => void;
}

export const HalfWidthCard: React.FC<HalfWidthCardProps> = ({
  icon,
  title,
  description,
  onWhyPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconBackground}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity onPress={onWhyPress} style={styles.whyButton}>
        <Text style={styles.whyButtonText}>Waarom?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  iconBackground: {
    backgroundColor: colors.primary[500],
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: 20,
  },
  whyButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  whyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
