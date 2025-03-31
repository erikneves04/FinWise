import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar as RNStatusBar } from "react-native";
import { useAuth } from "./src/services/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "./src/utils/fonts";
import { StatusBar } from "expo-status-bar"; // Importando StatusBar

import Register from "./src/screens/Register";
import RegisterIncome from "./src/screens/CreateRevenue";
import IncomeList from "./src/screens/ListRevenues";
import HomePage from "./src/screens/HomePage";
import Login from "./src/screens/Login";
import MyData from "./src/screens/MyData";
import { SafeArea } from "./src/components/SafeArea";

export type RootStackParamList = {
  Register: undefined;
  EditData: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ForgotPasswordConfirm: undefined;
  ConfirmRegister: undefined;
  HomePage: { reset?: boolean };
  MyData: undefined;
  RegisterIncome: undefined;
  IncomeList: undefined;
};

export default function Routes() {

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

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
  
  return (
    <NavigationContainer>
      <StatusBar style="dark" hidden={false} />
      <RNStatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />
      
      <SafeArea>
        <Navigator
          initialRouteName="Register"
          screenOptions={{ headerShown: false }}
        >
          <Screen name="Register" component={Register} />
          <Screen name="MyData" component={MyData} />
          <Screen name="Login" component={Login} />
          <Screen name="HomePage" component={HomePage} />
          <Screen name="RegisterIncome" component={RegisterIncome} />
          <Screen name="IncomeList" component={IncomeList} />
        </Navigator>
      </SafeArea>
    </NavigationContainer>
  );
}
