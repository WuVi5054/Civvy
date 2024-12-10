import { useClerk } from '@clerk/clerk-react'
import * as Linking from 'expo-linking'
import Button from "./Button";

type Props = {
  children: React.ReactNode;
};
export const SignOutButton = ({ children }: Props) => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return <Button onPress={handleSignOut}>{children}</Button>
}