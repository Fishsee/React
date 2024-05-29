import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/ui';

interface FullWidthCardProps {
  title: string;
  date: string;
  icon1: React.ReactNode;
  title1: string;
  value1: string;
  icon2: React.ReactNode;
  title2: string;
  value2: string;
}

export const FullWidthCard: React.FC<FullWidthCardProps> = ({
  title,
  date,
  icon1,
  title1,
  value1,
  icon2,
  title2,
  value2,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.block}>
          <View style={styles.iconBackground}>{icon1}</View>
          <Text style={styles.blockTitle}>{title1}</Text>
          <Text style={styles.blockValue}>{value1}</Text>
        </View>
        <View style={styles.block}>
          <View style={styles.iconBackground}>{icon2}</View>
          <Text style={styles.blockTitle}>{title2}</Text>
          <Text style={styles.blockValue}>{value2}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: colors.neutral[500],
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: colors.primary[500],
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  blockValue: {
    fontSize: 14,
    color: colors.neutral[500],
  },
});
