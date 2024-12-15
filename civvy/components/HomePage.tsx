import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton'
import * as Linking from 'expo-linking';
import Button from './Button';
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useEffect } from 'react';


interface Props {
  user: any; 
}
const HomePage = ({ user }: Props) => {
  const tasks = useQuery(api.tasks.get);
  const saveUser = useMutation(api.users.saveUserData)
  const getUser = useQuery(api.users.getUserData, { userId: user?.id })

  const handleSaveUser = async () => {
    try {
      const result = await saveUser({ userId: user?.id });
      console.log("Save User Response:", result);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  useEffect(() => {
    handleSaveUser();
  }, []);

  const userData = getUser;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.logo}>Civvy</Text>
          <SignOutButton>Sign Out</SignOutButton>
      </View>

        
      <Text style={styles.heroTitle}>Master Government Knowledge</Text>
      <Text style={styles.heroSubtitle}>
        Learn, engage, and stay informed {'\n'}
        about the Government and your Civic Duties.
        </Text>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.logo}>
          Hello Citizen
          </Text>

        {/* User Data Section */}
        {userData ? (
          <View>
            <Text style={{ fontSize: 32, color: "white" }}>
              Learning Points: {userData.exp}
            </Text>
           
          </View>
        ) : (
          <Text style={{ color: "white" }}>No user data found.</Text>
        )}

      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Navigation</Text>
        <View style={styles.featureItem}>
          <Button style={styles.navigationButton} onPress={() => Linking.openURL(Linking.createURL('/learning'))}>
            <Text style={styles.navigationButtonText}>Lessons</Text>
          </Button>
        </View>
        <View style={styles.featureItem}>
          <Button style={styles.navigationButton} onPress={() => Linking.openURL(Linking.createURL('/events'))}>
            <Text style={styles.navigationButtonText}>Events</Text>
          </Button>
        </View>
        <View style={styles.featureItem}>
          <Button style={styles.navigationButton} onPress={() => Linking.openURL(Linking.createURL('/joined-events'))}>
            <Text style={styles.navigationButtonText}>Joined Events</Text>
          </Button>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    [Platform.OS === 'web' ? 'height' : 'minHeight']: '100vh'
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
    color: '#fff',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  loginText: {
    color: '#000',
    fontSize: 16,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#000',
  },
  heroTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  ctaText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
  },
  eventsSection: {
    padding: 20,
    backgroundColor: '#000',
  },
  eventCard: {
    padding: 15,
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventDate: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  footerText: {
    color: '#fff',
    marginBottom: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footerLink: {
    color: '#fff',
    fontSize: 14,
  },
  navigationButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  navigationButtonText: { 
    color: 'white',
    fontSize: 28,
  },
});

export default HomePage;
