/* eslint-disable max-lines-per-function */
// Settings.tsx
import { useColorScheme } from 'nativewind';
import React from 'react';

import { BrightnessLevelScroller } from '@/components/settings/brightness-level-scroller'; // Import the new BrightnessLevelScroller component
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { ToggleItem } from '@/components/settings/toggle-item'; // Import the new ToggleItem component
import { translate, useAuth } from '@/core';
import { colors, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import { Github, Rate, Share, Support, Website } from '@/ui/icons';

const Settings: React.FC = () => {
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text>

          {/* Place the ToggleItem at the top, separated from the rest */}
          <View className="mb-2">
            <ToggleItem
              icon={<Support color={iconColor} />}
              title={'Test naam'}
              description={'Woonkamer'}
              initialValue={true}
            />
          </View>

          <ItemsContainer title="settings.info">
            <Item text="settings.aquariumName" value="TestNaam" />
            <Item text="settings.aquariumType" value="Fishsee Ultra" />
            <Item text="settings.aquariumZone" value="Woonkamer" />
            <Item text="settings.aquariumNummer" value="XL82MGF1Z" />
            <Item
              text="settings.aquariumAangesloten"
              value="08:32 27 Juni 2022"
            />
          </ItemsContainer>

          <ItemsContainer title="settings.aquariumBrightness">
            <BrightnessLevelScroller initialValue={50} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item text="settings.share" icon={<Share />} onPress={() => {}} />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Settings;
