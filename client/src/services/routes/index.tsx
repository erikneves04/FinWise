import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar as RNStatusBar } from "react-native";
import { useAuth } from "../context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "../../utils/fonts";
import { StatusBar } from "expo-status-bar";
import { SafeArea } from "../../components/SafeArea";

import Register from "../../screens/Register";
import RegisterIncome from "../../screens/CreateRevenue";
import IncomeList from "../../screens/ListRevenues";
import HomePage from "../../screens/HomePage";
import Login from "../../screens/Login";
import MyData from "../../screens/MyData";
import RegisterExpense from "../../screens/CreateExpenses";
import ExpenseList from "../../screens/ListExpenses";
import EditData from "../../screens/EditData";
import { GetUser } from "../../services/requests/User/GetUser";
import { Loading } from "../../components/Loading";

export type RootStackParamList = {
  Register: undefined;
  EditData: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ForgotPasswordConfirm: undefined;
  ConfirmRegister: undefined;
  HomePage: { reset?: boolean };
  MyData: undefined;
  RegisterIncome: { income?: any };
  IncomeList: undefined;
  RegisterExpense: { expense?: any };
  ExpenseList: undefined;
};

export default function Routes() {
  const fontsLoaded = useCustomFonts();
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setIsSignedIn, isSignedIn, setUser, setIsAdmin } = useAuth();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await GetUser();
        if (!userData) {
          setIsSignedIn(false);
        } else {
          setIsSignedIn(true);
          setUser(userData);
          if (userData.role === "admin") {
            setIsAdmin(true);
          }
        }
      } catch (err: any) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

  return (
    isReady ? (
      <NavigationContainer>
        <StatusBar style="dark" hidden={false} />
        <RNStatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />
        <SafeArea>
          <Navigator screenOptions={{ headerShown: false }}>
            {isSignedIn ? (
              <>
                <Screen name="HomePage" component={HomePage} />
                <Screen name="MyData" component={MyData} />
                <Screen name="RegisterIncome" component={RegisterIncome} />
                <Screen name="IncomeList" component={IncomeList} />
                <Screen name="RegisterExpense" component={RegisterExpense} />
                <Screen name="ExpenseList" component={ExpenseList} />
                <Screen name="EditData" component={EditData} />
              </>
            ) : (
              <>
                <Screen name="Login" component={Login} />
                <Screen name="Register" component={Register} />
              </>
            )}
          </Navigator>
        </SafeArea>
      </NavigationContainer>
    ) : null
  );
}

