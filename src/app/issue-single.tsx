import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FullWidthCard } from '@/components/issue-single/full-width-card';
import { HalfWidthCard } from '@/components/issue-single/half-width-card';
import { colors, Text } from '@/ui/';
import { ArrowLeft, Happy, Sad } from '@/ui/icons';

const IssueSingle: React.FC = () => {
  return (
    <View className="flex-1 px-2 pb-56" style={{ paddingTop: 65 }}>
      <View className="flex flex-row items-center justify-center">
        <ArrowLeft
          className="absolute left-0 mr-2"
          style={{ left: 15 }}
          onPress={() => {
            router.replace('/issues');
          }}
        />
        <Text className="text-xl font-semibold">PH Waarde Probleem</Text>
      </View>

      <View style={styles.container}>
        <FullWidthCard
          title="Current Issue"
          date="29 May 2024"
          icon1={<Sad color={colors.white} />}
          title1="Jouw waarde"
          value1="6,3"
          status1="bad"
          icon2={<Happy color={colors.white} />}
          title2="Streefwaarde"
          value2="7,0"
          status2="good"
        />
        <View style={styles.halfWidthCardsContainer}>
          <HalfWidthCard
            status="primary"
            icon={<Happy color={colors.white} />}
            title="Water verversen"
            description="20/30% van de inhoud"
            onWhyPress={() => alert('Waarom? for Card 1')}
          />
          <HalfWidthCard
            status="secondary"
            icon={<Happy color={colors.neutral[200]} />}
            title="PH+ tabletten"
            description="Toevoegen"
            onWhyPress={() => alert('Waarom? for Card 2')}
          />
          <HalfWidthCard
            status="secondary"
            icon={<Happy color={colors.neutral[200]} />}
            title="Soda bicarbonaat"
            description="Description for card 3"
            onWhyPress={() => alert('Waarom? for Card 3')}
          />
          <HalfWidthCard
            status="secondary"
            icon={<Happy color={colors.neutral[200]} />}
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
    padding: 15,
  },
  halfWidthCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default IssueSingle;
