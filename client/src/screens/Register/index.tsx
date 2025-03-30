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
  LogoView,
  MainView
} from "./styles";

import { NavigationButton } from '../../components/NavigationButton';
import { inputMasks } from "../../utils/inputMasks";
import { SubtitleBlue, SubtitleGrey, Title } from '../styles.Global';
import { TextField } from '../../components/TextField';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function Register({ navigation }: Props) {
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

  return (
    <Background>
      <MainView>
        <LogoItem height={120}/>

        <TitleWrapper>
          <Title>Cadastro de usuário</Title>
        </TitleWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Nome Completo"
            placeholder="Digite aqui seu nome completo"
            autoCapitalize="words"
            onChange={(text) => updateRegisterData({ name: text })}
            value={data.name}
          />
        </TextFieldWrapper>

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
          <TextField
            required
            placeholder="Digite aqui novamente a sua senha"
            secureTextEntry
            autoCapitalize="none"
            onChange={setConfirmPassword}
            value={confirmPassword}
          />
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Data de nascimento"
            placeholder="Digite aqui a sua data de nascimento"
            value={date}
            onChange={setDate}
            keyboardType="numeric"
          />
        </TextFieldWrapper>

        <ButtonWrapper>
          <NavigationButton
            height={40}
            width={70}
            buttonText="Cadastrar"
            action={onRegisterPress}
          />
        </ButtonWrapper>
        <RegisterContainer onPress={""}>
          <SubtitleGrey>Já tem conta?</SubtitleGrey>
          <SubtitleBlue> Faça login!</SubtitleBlue>
        </RegisterContainer>
      </MainView>
    </Background>
  );
}

