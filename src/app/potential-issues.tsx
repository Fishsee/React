import { router } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { FocusAwareStatusBar, Text, View } from '@/ui';
import { ArrowLeft } from '@/ui/icons';

function Issues() {
  return (
    <>
      <FocusAwareStatusBar />

      <View
        className="h-2/5 rounded-[40px] bg-[#3C6FD1]"
        style={styles.gradientContainer}
      >
        <View className="flex-1 px-4 pb-56" style={{ paddingTop: 60 }}>
          <View className="flex flex-row items-center justify-center">
            <ArrowLeft
              className="absolute left-0 mr-2"
              style={{ position: 'absolute', left: 0 }}
              onPress={() => {
                router.replace('/');
              }}
            />
            <Text className="text-xl font-semibold">Potentiële problemen</Text>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  gradientContainer: {},
});

export default Issues;
