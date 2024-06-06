import { router } from 'expo-router';
import React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/ui';
import { ArrowLeft } from '@/ui/icons';

function Issues() {
  return (
    <>
      <FocusAwareStatusBar />

      <View className="h-1/2 rounded-[40px] bg-[#3a75e1]">
        <View className="flex-1 px-4 pb-56" style={{ paddingTop: 60 }}>
          <View className="flex flex-row items-center justify-center">
            <ArrowLeft
              className="absolute left-0 mr-2"
              style={{ position: 'absolute', left: 0 }}
              onPress={() => {
                router.replace('/');
              }}
            />
            <Text className="text-xl font-semibold color-white">
              Potentiële problemen
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default Issues;
