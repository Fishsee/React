import React from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';
import PushNotification from 'react-native-push-notification';

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
  const triggerTestNotification = () => {
    PushNotification.localNotification({
      title: 'Test Notification',
      message: 'This is a test notification triggered by a button press.',
    });
  };

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
      <Button title="Test Notification" onPress={triggerTestNotification} />
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
