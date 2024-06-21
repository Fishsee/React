/* eslint-disable react/no-unstable-nested-components */
import { Redirect, router, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useAuth, useIsFirstTime } from '@/core';
import { TouchableOpacity } from '@/ui';
import {
  Feed as FeedIcon,
  Issues as IssuesIcon,
  Potential,
  Settings as SettingsIcon,
  Stats,
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
          headerRight: () => (
            <TouchableOpacity onPress={() => router.replace('/settings')}>
              <SettingsIcon color={'#1a1a1a'} style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
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
          tabBarIcon: ({ color }) => <Potential color={color} />,
          tabBarTestID: 'potential-issues-tab',
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistieken',
          headerShown: false,
          tabBarIcon: ({ color }) => <Stats color={color} />,
          tabBarTestID: 'stats-tab',
        }}
      />
    </Tabs>
  );
}
