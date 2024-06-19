// components/NotificationSwitch.tsx
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

interface NotificationSwitchProps {
  isEnabled: boolean;
  toggleSwitch: () => void;
  label: string;
}

const NotificationSwitch: React.FC<NotificationSwitchProps> = ({
  isEnabled,
  toggleSwitch,
  label,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
  },
});

export default NotificationSwitch;
