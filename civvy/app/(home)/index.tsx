import React from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { Text, Platform, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { Link, useRouter } from 'expo-router'
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { View } from '@/components/Themed'
import Button from '@/components/Button';
import LandingPage from '@/components/LandingPage';
import HomePage from '@/components/HomePage';
import { SignOutButton } from '@/components/SignOutButton'


const isWeb = Platform.OS === 'web';

export default function IndexPage() {
  const { user } = useUser()
  const tasks = useQuery(api.tasks.get);

  return (
    <View style={styles.container}>
      <SignedIn>
        <HomePage user={user} />
        {tasks?.map(({ _id, text }) => <Text style={[styles.greeting, { color: "white" }]} key={_id}>{text}</Text>)}
      </SignedIn>


      <SignedOut>
        <LandingPage user={user}/>
      </SignedOut>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  signedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  navigationButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  webAuthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 500,
  },
  mobileAuthContainer: {
    width: '100%',
    maxWidth: 300,
  },
  authButton: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  authButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});