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
  status1: 'good' | 'bad' | 'warning';
  status2: 'good' | 'bad' | 'warning';
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
  status1,
  status2,
}) => {
  const getStatusColor = (status: 'good' | 'bad' | 'warning') => {
    switch (status) {
      case 'good':
        return '#19F263';
      case 'bad':
        return '#FF5252';
      case 'warning':
        return colors.warning[500];
      default:
        return colors.neutral[500];
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.block}>
          <View style={styles.iconTitleContainer}>
            <View
              style={[
                styles.iconBackground,
                { backgroundColor: getStatusColor(status1) },
              ]}
            >
              {icon1}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.blockTitle}>{title1}</Text>
              <Text style={styles.blockValue}>{value1}</Text>
            </View>
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.iconTitleContainer}>
            <View
              style={[
                styles.iconBackground,
                { backgroundColor: getStatusColor(status2) },
              ]}
            >
              {icon2}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.blockTitle}>{title2}</Text>
              <Text style={styles.blockValue}>{value2}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 27,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 25,
  },
  block: {
    alignItems: 'center',
    flex: 1, // Ensure blocks take equal space
  },
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
  iconBackground: {
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.neutral[600],
  },
  blockValue: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 1,
  },
});

export default FullWidthCard;
``;
