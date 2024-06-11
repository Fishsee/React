// TipCard.tsx

import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

interface TipCardProps {
  icon: ImageSourcePropType;
  text: string;
  iconWidth?: number;
  iconHeight?: number;
}

const TipCard: React.FC<TipCardProps> = ({
  icon,
  text,
  iconWidth = 25,
  iconHeight = 25,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={[styles.icon, { width: iconWidth, height: iconHeight }]}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    borderColor: '#EDEDED',
    borderWidth: 1,
    marginTop: 20,
    width: 340,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#3A3A3A',
    width: 300,
  },
});

export default TipCard;
