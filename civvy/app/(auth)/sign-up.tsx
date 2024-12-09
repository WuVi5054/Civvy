import React from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { styles } from '@/constants/Styles'
import Button from '@/components/Button'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, View } from '@/components/Themed';
import * as Linking from "expo-linking";

import OAuthButton from '@/components/OAuthButton'
import { TextInput, Platform, ActivityIndicator } from 'react-native'
const isWeb = Platform.OS === 'web';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [isLoading, setIsLoading] = React.useState(false);

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState("");
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }
    setIsLoading(true);
    setError("");

    try {
      
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      })

      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setError("Invalid email address or password")
    } finally{
      setIsLoading(false);
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }
    setIsLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        if (!isWeb) {
          await setActive({ session: completeSignUp.createdSessionId })
        }
        Linking.openURL(Linking.createURL('/'))
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setError("Invalid code")
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.authScreen}>
      <View style={styles.authForm}>
        {!pendingVerification && (
          <>
            <View style={{ marginVertical: 16, alignItems: "center" }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Create your account
              </Text>
              <Text>
                Welcome! Please fill in the details to get started.
              </Text>
            </View>

            <View style={{
              display: "flex",
              flexDirection: "row",
              gap: 8
            }}>
              <View style={{ flex: 1 }}>
                <OAuthButton strategy="oauth_google">
                  <MaterialCommunityIcons name="google" size={18} />{" "}
                  Google
                </OAuthButton>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: '#eee'}} />
              <View>
                <Text style={{width: 50, textAlign: 'center'}}>or</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: '#eee'}} />
            </View>
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Text>Email address</Text>
            <TextInput
              style={[styles.input, { color: "white" }]}
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={(email) => setEmailAddress(email)}
            />
            <Text>Password</Text>
            <TextInput
              style={[styles.input, { color: "white" }]}
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <Button onPress={onSignUpPress}>
              <Text>Continue</Text> <Ionicons name='caret-forward' />
            </Button>

            <View style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              marginVertical: 18
            }}>
              <Text>Already have an account?</Text>
              <Link href="/sign-in">
                <Text style={{ fontWeight: "bold" }}>Sign in</Text>
              </Link>
            </View>
          </>
        )}

        {/* If the user has submitted credentials, render a verification form instead */}
        {pendingVerification && (
          <>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
            <TextInput
              style={[styles.input, { color: "white" }]}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)} />
            <Button onPress={onPressVerify}>
              Verify code
            </Button>
          </>
        )}

        {isLoading && <ActivityIndicator/>}
      </View>
    </View>
  )
}