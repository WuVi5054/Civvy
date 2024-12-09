import { Stack } from 'expo-router/stack';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, Tabs } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Tabs>
  );
}