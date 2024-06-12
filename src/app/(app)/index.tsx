import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import FoodCard from '@/components/dashboard/food-card';
import GraphCard from '@/components/dashboard/graph1-card';
import ProblemsCard from '@/components/dashboard/problems-card';
import { FocusAwareStatusBar, View } from '@/ui';

export default function Dashboard() {
  return (
    <ScrollView>
      <View className="flex-1" style={{ paddingBottom: 20 }}>
        <FocusAwareStatusBar />
        <GraphCard />

        <ProblemsCard />
        <FoodCard percentage={50} />
      </View>
    </ScrollView>
  );
}
