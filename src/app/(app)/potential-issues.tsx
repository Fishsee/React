import { router } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

import WaterQuality from '@/components/problem-card';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';
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
          <View className="mt-[80px] flex h-1/2 items-center justify-center">
            <Image
              source={require('../../../assets/img/sad.png')}
              style={{ width: 120, height: 120 }}
            />
            <Text className="mt-4 text-2xl font-bold text-white">
              Er zijn enkele problemen...
            </Text>
            <Text className="text-xl text-white">
              Er zijn potentiële problemen gedetecteerd.
            </Text>
          </View>
          <SafeAreaView>
            <WaterQuality title="Waterkwaliteit" index={0.5} />
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}

export default Issues;
