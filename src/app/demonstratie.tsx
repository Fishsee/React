/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import pushNotificationIos from '@/components/push-notification-ios';
import { ActionButton } from '@/components/settings/action-button';
import { PhPopUp } from '@/components/settings/ph-pop-up';
import { ToggleItem } from '@/components/settings/toggle-item';
import { colors, Text } from '@/ui/';
import { ArrowLeft } from '@/ui/icons';
import { Checkmark } from '@/ui/icons/checkmark';

const IssueSingle: React.FC = () => {
  const handleNotification = () => {
    pushNotificationIos.localNotification();
  };
  const handlePhPopUp = () => {
    setPhPopUpVisible(true);
  };
  const [isPhPopUpVisible, setPhPopUpVisible] = useState(false);

  return (
    <>
      <View className="flex-1 px-2 pb-56" style={{ paddingTop: 65 }}>
        <View className="mb-8 flex flex-row items-center justify-center">
          <ArrowLeft
            className="absolute left-0 mr-2"
            style={{ left: 15 }}
            onPress={() => {
              router.replace('/');
            }}
          />
          <Text className="text-xl font-semibold">Demonstratie</Text>
        </View>
        <ActionButton
          icon={<Checkmark color={colors.neutral[100]} />}
          title={'PH Notificatie'}
          onPress={handleNotification}
          iconBackgroundColor={colors.neutral[600]}
        />
        <ActionButton
          icon={<Checkmark color={colors.neutral[100]} />}
          title={'PH+ tablet toevoegen'}
          onPress={handlePhPopUp}
          iconBackgroundColor={colors.neutral[600]}
        />
        <ToggleItem
          icon={<Checkmark color={colors.neutral[100]} />}
          title={'Pomp aan/uit'}
          description={'Zet de pomp aan of uit'}
          initialValue={true}
        />
        <ToggleItem
          icon={<Checkmark color={colors.neutral[100]} />}
          title={'Voederbak open/dicht'}
          description={'Open of sluit de voederbak'}
          initialValue={true}
        />
      </View>
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

export default IssueSingle;
