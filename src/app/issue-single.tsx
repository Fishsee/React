import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { FullWidthCard } from '@/components/issue-single/full-width-card';
import { HalfWidthCard } from '@/components/issue-single/half-width-card';
import { Share } from '@/ui/icons'; // Replace with actual icons

const IssueSingle: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FullWidthCard
        title="Current Issue"
        date="29 May 2024"
        icon1={<Share />}
        title1="Temperature"
        value1="24°C"
        icon2={<Share />}
        title2="pH Level"
        value2="7.4"
      />
      <View style={styles.halfWidthCardsContainer}>
        <HalfWidthCard
          icon={<Share />}
          title="Card 1"
          description="Description for card 1"
          onWhyPress={() => alert('Waarom? for Card 1')}
        />
        <HalfWidthCard
          icon={<Share />}
          title="Card 2"
          description="Description for card 2"
          onWhyPress={() => alert('Waarom? for Card 2')}
        />
        <HalfWidthCard
          icon={<Share />}
          title="Card 3"
          description="Description for card 3"
          onWhyPress={() => alert('Waarom? for Card 3')}
        />
        <HalfWidthCard
          icon={<Share />}
          title="Card 4"
          description="Description for card 4"
          onWhyPress={() => alert('Waarom? for Card 4')}
        />
      </View>
    </ScrollView>
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
