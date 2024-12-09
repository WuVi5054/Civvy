import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton'
import * as Linking from 'expo-linking';
import Button from './Button';

interface Props {
  user: any; 
}
const HomePage = ({ user }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.logo}>Civvy</Text>
          <SignOutButton />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.logo}>
          Hi
            Hello {user?.emailAddresses[0].emailAddress}
          </Text>
          <Button style={styles.navigationButton} onPress={() => Linking.openURL(Linking.createURL('/two'))}>
            <Text>Two</Text>
          </Button>
        <Text style={styles.heroTitle}>Master Government Knowledge</Text>
        <Text style={styles.heroSubtitle}>Learn, engage, and stay informed about the Government and your Civic Duties.</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureItem}>
          <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.featureIcon} />
          <Text style={styles.featureText}>Interactive Lessons</Text>
        </View>
        <View style={styles.featureItem}>
          <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.featureIcon} />
          <Text style={styles.featureText}>Gamified Progress</Text>
        </View>
        <View style={styles.featureItem}>
          <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.featureIcon} />
          <Text style={styles.featureText}>Live Events</Text>
        </View>
      </View>

      {/* Events Section */}
      <View style={styles.eventsSection}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Town Hall Q&A</Text>
          <Text style={styles.eventDate}>March 25, 2024</Text>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Legislation Workshop</Text>
          <Text style={styles.eventDate}>April 5, 2024</Text>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Copyright © 2024 GovLearn. All rights reserved.</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>
              Terms of Service
            </Text>
          </TouchableOpacity>
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
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default HomePage;
