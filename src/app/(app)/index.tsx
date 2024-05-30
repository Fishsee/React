import React from 'react';

import { FocusAwareStatusBar, View } from '@/ui';

export default function Dashboard() {
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
    </View>
  );
}
