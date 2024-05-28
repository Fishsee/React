import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IssueCardProps {
  iconLeft: React.ReactNode;
  mainText: string;
  subText: string;
  iconRight: React.ReactNode;
  onPress?: () => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  iconLeft,
  mainText,
  subText,
  iconRight,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>{iconLeft}</View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.subText}>{subText}</Text>
      </View>
      <View style={styles.iconContainer}>{iconRight}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F3F3',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    width: 300,
    marginTop: 15,
    height: 75,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  iconContainer: {
    marginHorizontal: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 2,
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 18,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 18,
  },
});

export default IssueCard;
