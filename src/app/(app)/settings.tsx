/* eslint-disable max-lines-per-function */
// Settings.tsx
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';

import { ActionButton } from '@/components/settings/action-button';
import { BrightnessLevelScroller } from '@/components/settings/brightness-level-scroller';
import { CodeModal } from '@/components/settings/code-modal'; // Import the CodeModal component
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { SearchModal } from '@/components/settings/search-modal'; // Import the SearchModal component
import { ToggleItem } from '@/components/settings/toggle-item';
import { translate, useAuth } from '@/core';
import { colors, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import { Code, Disconnect, Support, Wifi } from '@/ui/icons';
import { ArrowLeft } from '@/ui/icons/arrow-left';

const Settings: React.FC = () => {
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [isCodeModalVisible, setCodeModalVisible] = useState(false);

  const handleConnectWifi = () => {
    setSearchModalVisible(true);
    // Simulate searching for devices
    setTimeout(() => {
      setSearchModalVisible(false);
      // Handle the result of the search here
    }, 5000); // Adjust the duration as needed
  };

  const handleConnectCode = () => {
    setCodeModalVisible(true);
  };

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pb-56" style={{ paddingTop: 65 }}>
          <View className="flex flex-row items-center justify-center">
            <ArrowLeft
              className="absolute left-0 mr-2"
              style={{ left: 0 }}
              onPress={() => {
                router.back();
              }}
            />
            <Text className="text-xl font-semibold">
              {translate('settings.title')}
            </Text>
          </View>

          <View className="mb-2 mt-3">
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
          <Text className="mb-2" style={{ marginTop: 15, fontSize: 17 }}>
            Acties
          </Text>
          <View style={{ marginBottom: 16 }}>
            <ActionButton
              icon={<Wifi color={colors.neutral[100]} width={22} />}
              title={'Connect Aquarium via wifi'}
              onPress={handleConnectWifi}
              iconBackgroundColor={colors.neutral[600]}
            />
            <ActionButton
              icon={<Code color={colors.neutral[100]} />}
              title={'Connect Aquarium met koppelcode'}
              onPress={handleConnectCode}
              iconBackgroundColor={colors.neutral[600]}
            />
            <ActionButton
              icon={<Disconnect color={colors.neutral[100]} />}
              title={'Disconnect Aquarium'}
              onPress={() => {
                router.replace('/');
              }}
              iconBackgroundColor={colors.danger[500]}
            />
          </View>

          <View>
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>

      <SearchModal
        visible={isSearchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />
      <CodeModal
        visible={isCodeModalVisible}
        onClose={() => setCodeModalVisible(false)}
      />
    </>
  );
};

export default Settings;
