/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useAuth, useIsFirstTime } from '@/core';
import { Pressable, Text } from '@/ui';
import {
  Feed as FeedIcon,
  Issues as IssuesIcon,
  Settings as SettingsIcon,
} from '@/ui/icons';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overzicht',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'feed-tab',
        }}
      />

      <Tabs.Screen
        name="issues"
        options={{
          title: 'Problemen',
          headerShown: false,
          tabBarIcon: ({ color }) => <IssuesIcon color={color} />,
          tabBarTestID: 'issues-tab',
        }}
      />
      <Tabs.Screen
        name="potential-issues"
        options={{
          title: 'Potentieel',
          headerShown: false,
          tabBarIcon: ({ color }) => <IssuesIcon color={color} />,
          tabBarTestID: 'potential-issues-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Instellingen',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/potential-issues" asChild>
      <Pressable>
        <Text className="px-3 text-primary-300">Create</Text>
      </Pressable>
    </Link>
  );
};
