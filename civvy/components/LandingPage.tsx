import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton'
import * as Linking from 'expo-linking';
import Button from './Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const LandingPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.logo}>Civvy</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => Linking.openURL(Linking.createURL('/sign-in'))}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Master Government Knowledge {'\n'} 
          & Join the Civic Revolution
          </Text>
        <Text style={styles.heroSubtitle}>
          Learn, engage, and stay informed {'\n'}
          on about the Government and your Civic Duties.
          </Text>
        <TouchableOpacity style={styles.ctaButton} onPress={() => Linking.openURL(Linking.createURL('/sign-up'))}>
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Form separator */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 4, backgroundColor: '#eee'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: "#555"}}>-</Text>
          </View>
          <View style={{flex: 1, height: 4, backgroundColor: '#eee'}} />
        </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureItem}>
          <FontAwesome name="book" size={60} color={"#fff"} style={{ marginRight: 15 }}/>
          <Text style={styles.featureText}>
            Learn about your Civic Duties {'\n'}
            and the Government 
            {'\n'}through Interactive Lessons
            </Text>
        </View>
        {/* Form separator */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 4, backgroundColor: '#eee'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: "#555"}}>-</Text>
          </View>
          <View style={{flex: 1, height: 4, backgroundColor: '#eee'}} />
        </View>
        <View style={styles.featureItem}>
          <FontAwesome name="plane" size={60} color={"#fff"} style={{ marginRight: 15 }}/>
          <Text style={styles.featureText}>
            Tap into a Network of {'\n'}
            Civic Leaders to Connect and{'\n'}
             Get Involved in Live Events
             </Text>
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
    backgroundColor: 'rgb(77, 78, 85)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
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
    fontSize: 36,
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
    fontSize: 24,
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

export default LandingPage;
