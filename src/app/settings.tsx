/* eslint-disable max-lines-per-function */
// Settings.tsx
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { ActionButton } from '@/components/settings/action-button';
import { AddFishModal } from '@/components/settings/add-fish-modal'; // Import the AddFishModal component
import { BrightnessLevelScroller } from '@/components/settings/brightness-level-scroller';
import { CodeModal } from '@/components/settings/code-modal';
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { PhPopUp } from '@/components/settings/ph-pop-up'; // Zorg ervoor dat dit correct is
import { SearchModal } from '@/components/settings/search-modal'; // Import the SearchModal component
import { ToggleItem } from '@/components/settings/toggle-item';
import { colors, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import { ArrowLeft, Code, Disconnect, Feed, Support, Wifi } from '@/ui/icons';
import { Checkmark } from '@/ui/icons/checkmark';
import { useEffect } from 'react';
import axios from 'axios';
import Slider from '@react-native-community/slider';

const Settings: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [isCodeModalVisible, setCodeModalVisible] = useState(false);
  const [isAddFishModalVisible, setAddFishModalVisible] = useState(false);
  const [isPhPopUpVisible, setPhPopUpVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  const roundValue = (value: number) => {
    const possibleValues = [0, 25, 50, 75, 100];
    return possibleValues.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

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

  const handleAddFish = () => {
    setAddFishModalVisible(true);
  };

  const handlePhPopUp = () => {
    setPhPopUpVisible(true);
  };

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post(
          'https://api.example.com/brightness',
          {
            value: sliderValue,
          }
        );
        console.log('Data posted:', response.data);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

    postData();
  }, [sliderValue]);

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pb-56" style={{ paddingTop: 65 }}>
          <View className="flex flex-row items-center justify-center">
            <ArrowLeft
              className="absolute left-0 mr-2"
              style={{ left: 15 }}
              onPress={() => {
                router.replace('/');
              }}
            />
            <Text className="text-xl font-semibold">Instellingen</Text>
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

          <ItemsContainer title="settings.sliderExample">
            <Text className="mb-2" style={{ marginTop: 15, fontSize: 17 }}>
              Brightness Level: {sliderValue}
            </Text>
            <Slider
              style={{ width: 350, height: 40 }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={sliderValue}
              onValueChange={(val) => setSliderValue(roundValue(val))}
              minimumTrackTintColor="#00008B"
              maximumTrackTintColor="#00008B"
              thumbTintColor="#00008B"
            />
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
              icon={<Feed color={colors.neutral[100]} />}
              title={'Vis toevoegen'}
              onPress={handleAddFish}
              iconBackgroundColor={colors.neutral[600]}
            />
            <ActionButton
              icon={<Checkmark color={colors.neutral[100]} />}
              title={'PH+ tablet toevoegen'}
              onPress={handlePhPopUp}
              iconBackgroundColor={colors.neutral[600]}
            />
            <ActionButton
              icon={<Disconnect color={colors.neutral[100]} />}
              title={'Disconnect Aquarium'}
              onPress={() => {
                router.replace('/login');
              }}
              iconBackgroundColor={colors.danger[500]}
            />
          </View>

          <View>
            <ItemsContainer>
              <Item
                text="settings.logout"
                onPress={() => {
                  router.replace('/login');
                }}
              />
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
      <AddFishModal
        visible={isAddFishModalVisible}
        onClose={() => setAddFishModalVisible(false)}
      />
      <PhPopUp
        visible={isPhPopUpVisible}
        onClose={() => setPhPopUpVisible(false)}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Weet u zeker dat u een PH+ tablet in uw aquarium wilt laten vallen?
        </Text>
        <View style={{ flexDirection: 'row', columnGap: 20, marginTop: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#007BFF',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            onPress={() => setPhPopUpVisible(false)}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              Ja
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#007BFF',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            onPress={() => setPhPopUpVisible(false)}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              Nee
            </Text>
          </TouchableOpacity>
        </View>
      </PhPopUp>
    </>
  );
};

export default Settings;
