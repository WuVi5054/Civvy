import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Tabs } from 'expo-router';
import React from 'react';


import { TabBarIcon } from '@/components/TabBarIcon';
import Colors  from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function AuthRoutesLayout() {
  const colorScheme = useColorScheme();
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
      >
      <Tabs.Screen
        name="sign-in"
        options={{
          title: 'Sign in',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'sign-in'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sign-up"
        options={{
          title: 'Sign up',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'sign-out'} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}