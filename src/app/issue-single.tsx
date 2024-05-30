import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FullWidthCard } from '@/components/issue-single/full-width-card';
import { HalfWidthCard } from '@/components/issue-single/half-width-card';
import { colors, Text } from '@/ui/';
import { ArrowLeft, Share } from '@/ui/icons';

const IssueSingle: React.FC = () => {
  return (
    <View className="flex-1 px-2 pb-56" style={{ paddingTop: 65 }}>
      <View className="flex flex-row items-center justify-center">
        <ArrowLeft
          className="absolute left-0 mr-2"
          style={{ left: 20 }}
          onPress={() => {
            router.back();
          }}
        />
        <Text className="text-xl font-semibold">PH Waarde Probleem</Text>
      </View>

      <View style={styles.container}>
        <FullWidthCard
          title="Current Issue"
          date="29 May 2024"
          icon1={<Share color={colors.neutral[200]} />}
          title1="Temperature"
          value1="24°C"
          icon2={<Share color={colors.neutral[200]} />}
          title2="pH Level"
          value2="7.4"
        />
        <View style={styles.halfWidthCardsContainer}>
          <HalfWidthCard
            icon={<Share color={colors.neutral[200]} />}
            title="Card 1"
            description="Description for card 1"
            onWhyPress={() => alert('Waarom? for Card 1')}
          />
          <HalfWidthCard
            icon={<Share color={colors.neutral[200]} />}
            title="Card 2"
            description="Description for card 2"
            onWhyPress={() => alert('Waarom? for Card 2')}
          />
          <HalfWidthCard
            icon={<Share color={colors.neutral[200]} />}
            title="Card 3"
            description="Description for card 3"
            onWhyPress={() => alert('Waarom? for Card 3')}
          />
          <HalfWidthCard
            icon={<Share color={colors.neutral[200]} />}
            title="Card 4"
            description="Description for card 4"
            onWhyPress={() => alert('Waarom? for Card 4')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  halfWidthCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default IssueSingle;
