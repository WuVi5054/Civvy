import React, { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { Platform } from "react-native";
import * as Linking from "expo-linking";
import Button from "./Button";

type Props = {
  strategy: string;
  children: React.ReactNode;
};
const isWeb = Platform.OS === 'web';

WebBrowser.maybeCompleteAuthSession();

export default function OAuthButton({ strategy, children }: Props) {
  const { startOAuthFlow } = useOAuth({ strategy });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/one"),
      });
      if (createdSessionId && setActive) {
        if (!isWeb) {
          await setActive({ session: createdSessionId });
        }
        Linking.openURL(Linking.createURL('/'))
      }

      // handle the response
    } catch (error) {
      console.error(error);
    }
  }, [startOAuthFlow]);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    void WebBrowser.warmUpAsync();
    return () => {
      if (Platform.OS !== "android") return;

      void WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <Button onPress={onPress}>{children}</Button>
  );
}