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
          <View style={styles.iconTitleContainer}>
            <View style={styles.iconBackground}>{icon1}</View>
            <Text style={styles.blockTitle}>{title1}</Text>
          </View>
          <Text style={styles.blockValue}>{value1}</Text>
        </View>
        <View style={styles.block}>
          <View style={styles.iconTitleContainer}>
            <View style={styles.iconBackground}>{icon2}</View>
            <Text style={styles.blockTitle}>{title2}</Text>
          </View>
          <Text style={styles.blockValue}>{value2}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary[900],
  },
  date: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    alignItems: 'center',
  },
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: colors.primary[500],
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary[900],
  },
  blockValue: {
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: 5,
  },
});

export default FullWidthCard;
