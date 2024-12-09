import React from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { Text, Platform, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { Link, useRouter } from 'expo-router'
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';


import { View } from '@/components/Themed'
import Button from '@/components/Button';
import { SignOutButton } from '@/components/SignOutButton'


const isWeb = Platform.OS === 'web';

const LandingPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.logo}>VoteEd</Text>
          <View style={styles.nav}>
            <Text style={styles.navLink}>Features</Text>
            <Text style={styles.navLink}>About</Text>
            <Text style={styles.navLink}>Contact</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Empower Your Voice in Democracy</Text>
          <Text style={styles.heroText}>Learn about voting, government, and civic engagement through interactive education.</Text>
          <View style={styles.ctaButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Our Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureItemTitle}>Interactive Lessons</Text>
              <Text style={styles.featureItemText}>Engage with dynamic content designed to make learning about government and voting easy and fun.</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureItemTitle}>Up-to-date Information</Text>
              <Text style={styles.featureItemText}>Stay informed with the latest updates on election processes, candidates, and policy issues.</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureItemTitle}>Community Forums</Text>
              <Text style={styles.featureItemText}>Connect with other civic-minded individuals to discuss important topics and share insights.</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>&copy; 2024 VoteEd. All rights reserved.</Text>
          <View style={styles.footerNav}>
            <Text style={styles.footerLink}>Terms of Service</Text>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default function HomePage() {
  const { user } = useUser()

  return (
    <View style={styles.container}>
      <SignedIn>
      <View style={styles.signedInContainer} lightColor="#eee" darkColor="rgba(255,255,255,1)">
        <LandingPage />
          <Text style={styles.greeting}>
            Hello {user?.emailAddresses[0].emailAddress}
          </Text>
          <Button style={styles.navigationButton} onPress={() => Linking.openURL(Linking.createURL('/two'))}>
            <Text>Two</Text>
          </Button>
          <SignOutButton />
        </View>
      </SignedIn>
      <SignedOut>
        <View style={styles.mobileAuthContainer} lightColor="#eee" darkColor="rgba(255,255,255,1)">
              <Text >Welcome to VoteEd</Text>
              <Text >Sign in or sign up to get started</Text>
                <Button style={styles.authButton} onPress={() => Linking.openURL(Linking.createURL('/sign-in'))}>
                  <Text style={styles.authButtonText}>Sign In</Text>
                </Button>
                <Button style={styles.authButton} onPress={() => Linking.openURL(Linking.createURL('/sign-up'))}>
                  <Text style={styles.authButtonText}>Sign Up</Text>
                </Button>
                <Button style={styles.navigationButton} onPress={() => Linking.openURL(Linking.createURL('/two'))}>
                  <Text>Two</Text>
                </Button>
            </View>
      </SignedOut>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  signedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    maxWidth: 300,
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
    backgroundColor: '#f8f8f8',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
  },
  navLink: {
    marginLeft: 20,
    color: '#333',
  },
  hero: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#e9ecef',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  heroText: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  ctaButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
  },
  features: {
    padding: 40,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureList: {
    flexDirection: 'column',
  },
  featureItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featureItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureItemText: {
    fontSize: 14,
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  footerText: {
    marginBottom: 10,
  },
  footerNav: {
    flexDirection: 'row',
  },
  footerLink: {
    marginHorizontal: 10,
    color: '#333',
  },
  
});