import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "./src/utils/fonts";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./src/screens/Register";
import CadastroReceita from "./src/screens/CreateRevenue";
import ListagemReceita from "./src/screens/ListRevenues"

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Cadastro de Usuário" onPress={() => navigation.navigate("Register")} />
      <Button title="Cadastro de Receita" onPress={() => navigation.navigate("Cadastro de receitas")} />
      <Button title="Listagem de Receitas" onPress={() => navigation.navigate("Minhas receitas")} />
    </View>
  );
}

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Cadastro de receitas" component={CadastroReceita} />
        <Stack.Screen name="Minhas receitas" component={ListagemReceita} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});