import Slider from '@react-native-community/slider'; // Import Slider from the new package
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/ui';

interface BrightnessLevelScrollerProps {
  initialValue?: number;
}

export const BrightnessLevelScroller: React.FC<
  BrightnessLevelScrollerProps
> = ({ initialValue = 50 }) => {
  const [brightness, setBrightness] = useState(initialValue);

  const handleValueChange = (value: number) => {
    setBrightness(Math.round(value));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer} />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1} // Add step to make the slider move in whole numbers
        minimumTrackTintColor={colors.primary[500]}
        maximumTrackTintColor={colors.neutral[300]}
        thumbTintColor={colors.primary[700]}
        value={brightness}
        onValueChange={handleValueChange}
      />
      <View style={styles.valueContainer}>
        <Text style={styles.brightnessValue}>{brightness}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  slider: {
    width: '100%',
    height: 40,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  brightnessValue: {
    fontSize: 14,
    color: 'gray',
    marginRight: 10,
  },
});
