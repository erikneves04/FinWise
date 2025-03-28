import React, { useEffect, useState } from "react";
import Register from "./src/screens/Register"; 
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "./src/utils/fonts"; 

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = useCustomFonts();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded]);

  if (!isReady) {
    return null;
  }

  return <Register />;
}
