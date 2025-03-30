import { useEffect, useState } from "react";
import { useAuth } from "./src/services/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "./src/utils/fonts";

import Register from "./src/screens/Register";
import RegisterIncome from "./src/screens/CreateRevenue";
import IncomeList from "./src/screens/ListRevenues";
import HomePage from "./src/screens/HomePage";

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
        <Navigator
        initialRouteName= "Register"
        screenOptions = {{ headerShown: false }}
      >
          <Screen name="Register" component = { Register } />
          <Screen name="HomePage" component = { HomePage } />
          <Screen name="RegisterIncome" component = { RegisterIncome } />
          <Screen name="IncomeList" component = { IncomeList } />
        </Navigator>
      </NavigationContainer>
    );
}
