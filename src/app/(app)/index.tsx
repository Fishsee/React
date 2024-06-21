import React from 'react';
import { ScrollView, View } from 'react-native';

import FoodCard from '@/components/dashboard/food-card';
import GraphCard from '@/components/dashboard/graph1-card';
import ProblemsCard from '@/components/dashboard/problems-card';
// Adjust the import path as necessary
import { FocusAwareStatusBar } from '@/ui';

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
