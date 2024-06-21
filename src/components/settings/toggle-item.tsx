// ToggleItem.tsx
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { colors } from '@/ui';

interface ToggleItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  initialValue?: boolean;
}

export const ToggleItem: React.FC<ToggleItemProps> = ({
  icon,
  title,
  description,
  initialValue = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View
      style={styles.container}
      className=" rounded-md border-[1px] border-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <View style={styles.textContainer}>
        {icon}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <Switch
        style={styles.switch}
        trackColor={{ false: colors.neutral[300], true: colors.primary[500] }}
        thumbColor={isEnabled ? colors.primary[700] : colors.neutral[100]}
        ios_backgroundColor={colors.neutral[300]}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingLeft: 15,
    marginTop: 15,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textWrapper: {
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: 'gray',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
