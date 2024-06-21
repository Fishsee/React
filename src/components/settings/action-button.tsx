// ActionButton.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/ui';

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  iconBackgroundColor: string; // Add iconBackgroundColor prop
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  title,
  onPress,
  iconBackgroundColor,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View
        style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
      >
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12, // Reduced vertical padding
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderColor: colors.neutral[200],
    borderWidth: 1,
    backgroundColor: colors.white, // Set a default background color for the button
  },
  iconContainer: {
    width: 40, // Smaller icon container
    height: 40, // Smaller icon container
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: colors.neutral[900],
  },
});
