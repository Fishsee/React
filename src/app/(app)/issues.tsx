import { router } from 'expo-router';
import React from 'react';

import IssueCard from '@/components/issue-card';
import { colors, FocusAwareStatusBar, Text, View } from '@/ui';
import { ArrowLeft, ArrowRight, Share } from '@/ui/icons';

function Issues() {
  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1 px-4 pb-56" style={{ paddingTop: 60 }}>
        <View className="flex flex-row items-center justify-center">
          <ArrowLeft
            className="absolute left-0 mr-2"
            style={{ position: 'absolute', left: 0 }}
            onPress={() => {
              router.replace('/');
            }}
          />
          <Text className="text-xl font-semibold">Problemen</Text>
        </View>

        <View className="flex flex-1 items-center pt-4">
          <IssueCard
            iconLeft={<Share color={colors.neutral[600]} />}
            mainText="pH waarde laag"
            subText="Urgent"
            iconRight={<ArrowRight color={colors.neutral[400]} />}
            onPress={() => {
              router.replace('/issue-single');
            }}
          />
          <IssueCard
            iconLeft={<Share color={colors.neutral[600]} />}
            mainText="Voedselniveau laag"
            subText="Urgent"
            iconRight={<ArrowRight color={colors.neutral[400]} />}
          />
          <IssueCard
            iconLeft={<Share color={colors.neutral[600]} />}
            mainText="Turbiditeit hoog"
            subText="Urgent"
            iconRight={<ArrowRight color={colors.neutral[400]} />}
          />
          <IssueCard
            iconLeft={<Share color={colors.neutral[600]} />}
            mainText="Watercirculatie laag"
            subText="Urgent"
            iconRight={<ArrowRight color={colors.neutral[400]} />}
          />
        </View>
      </View>
    </>
  );
}

export default Issues;
