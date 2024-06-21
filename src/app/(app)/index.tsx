import React from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FoodCard from '@/components/dashboard/food-card';
import GraphCard from '@/components/dashboard/graph1-card';
import ProblemsCard from '@/components/dashboard/problems-card';
import PushNotificationConfig from '@/components/push-notification-ios'; // Adjust the import path as necessary
import { FocusAwareStatusBar } from '@/ui';

export default function Dashboard() {
  const handlePress = () => {
    PushNotificationConfig.localNotification();
  };
  return (
    <ScrollView>
      <View className="flex-1" style={{ paddingBottom: 20 }}>
        <FocusAwareStatusBar />
        <GraphCard />
        <ProblemsCard />
        <TouchableOpacity
          onPress={handlePress}
          style={{ height: 250, backgroundColor: '#000' }}
        />
        <FoodCard percentage={50} />
      </View>
    </ScrollView>
  );
}
