import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';
import LogoItem from '../../assets/svg/logo';

import { Background } from '../../components/Background';
import {
  TextFieldWrapper,
  TitleWrapper,
  ButtonWrapper,
  RegisterContainer,
  SubtitleWrapper,
  MainView
} from "./styles";

import { NavigationButton } from '../../components/NavigationButton';
import { inputMasks } from "../../utils/inputMasks";
import { SubtitleBlue, SubtitleGrey, Title } from '../styles.Global';
import { TextField } from '../../components/TextField';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function Login({ navigation }: Props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cellNumber: "",
    birthdate: "",
    company: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState("");

  function updateRegisterData(newData: Partial<typeof data>) {
    setData((prevData) => ({ ...prevData, ...newData }));
  }

  const onRegisterPress = async () => {
    try {
      navigation.navigate("HomePage");
    } catch (err: any) {

    }
  };

  const onLoginPress = async () => {
    try {
      navigation.navigate("Login");
    } catch (err: any) {

    }
  };

  return (
    <Background>
      <MainView>
        <LogoItem height={120} />

        <TitleWrapper>
          <Title>Entre na sua conta</Title>
        </TitleWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Email"
            placeholder="Digite aqui o seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onChange={(text) => updateRegisterData({ email: text })}
            value={data.email}
          />
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Senha"
            placeholder="Digite aqui a sua senha"
            secureTextEntry
            autoCapitalize="none"
            onChange={(text) => updateRegisterData({ password: text })}
            value={data.password}
          />
        </TextFieldWrapper>

        <ButtonWrapper>
          <NavigationButton
            height={40}
            width={70}
            buttonText="Entrar"
            action={onRegisterPress}
          />
        </ButtonWrapper>
      </MainView>
    </Background>
  );
}

