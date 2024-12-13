import { StyleSheet } from 'react-native';
import Button from '@/components/Button';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { SignOutButton } from '@/components/SignOutButton'
import { Link, Redirect } from 'expo-router';
import * as Linking from 'expo-linking';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Hello there 33</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button onPress={() => Linking.openURL(Linking.createURL('/'))}>
        <Text>Home</Text>
      </Button>
      <SignOutButton>Sign Out</SignOutButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
