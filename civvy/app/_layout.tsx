import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Stack } from 'expo-router';

import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { useColorScheme } from '@/components/useColorScheme';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from 'convex/react-clerk';


const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}


export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>

            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen 
                  name="(tabs)" 
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="modal" 
                  options={{ presentation: 'modal' }} 
                />
                <Stack.Screen name="(home)" options={{ headerShown: false }}/>
              </Stack>
            </ThemeProvider>
            </ConvexProviderWithClerk>
            
          </ClerkLoaded>

        </ClerkProvider>
      
  );
}