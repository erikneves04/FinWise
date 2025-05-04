import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../services/routes';
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
import { Modal } from '../../components/Modal';
import { CreateUser, CreateUserData } from '../../services/requests/User/CreateUser';
import { convertToDateISOString, formatInputDate, handleApiError, isEmptyField } from '../../utils/functions';
import { Loading } from '../../components/Loading';
import { MessageBalloon } from '../../components/MessageBallon';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function Register({ navigation }: Props) {
  const [data, setData] = useState<CreateUserData>({
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [notSavedDataMsg, setNotSavedDataMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  function updateRegisterData(newLoginData: Partial<CreateUserData>) {
    if (!data) return;
    setData({ ...data, ...newLoginData });
  }

  const onRegisterPress = async () => {
    console.log(data)
    if (isEmptyField(data)) {
      setErrorMsg("Preencha todos os campos obrigatórias antes.");
      setError(true);
      return;
    }

    if (data.senha !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      setError(true);
      return;
    }

    try {
      setLoading(true);
      await CreateUser(data);
      navigation.navigate("HomePage");
      setLoading(false);
    } catch (err: any) {
      setErrorMsg(handleApiError(err));
      setError(true);
      setLoading(false);
    }
  };

  const onLoginPress = async () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    const isoDate = convertToDateISOString(date);
    updateRegisterData({ dataNascimento: isoDate ?? undefined });
  }, [date]);

  return (
    <Background>
      {loading && <Loading />}
      <Modal height='85' borderRadius={3}>
        <MainView>
          <LogoItem height={120} />

          <TitleWrapper>
            <Title>Cadastro de conta</Title>
          </TitleWrapper>

          <TextFieldWrapper>
            <TextField
              required
              label="Nome Completo"
              placeholder="Digite aqui seu nome completo"
              autoCapitalize="words"
              onChange={(text) => updateRegisterData({ nome: text })}
              value={data.nome}
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
              onChange={(text) => updateRegisterData({ senha: text })}
              value={data.senha}
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
              onChange={(text) => setDate(formatInputDate(text))}
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

          <RegisterContainer onPress={onLoginPress}>
            <SubtitleGrey>Já tem conta?</SubtitleGrey>
            <SubtitleBlue> Faça login!</SubtitleBlue>
          </RegisterContainer>
        </MainView>
      </Modal>

      {notSavedDataMsg && (
        <MessageBalloon
          hasGoBackButton
          title="Atenção"
          text="Um ou mais itens que não foram salvos serão perdidos com essa ação."
          handleCancelButton={() => setNotSavedDataMsg(false)}
          handleConfirmButton={() => {
            setNotSavedDataMsg(false);
            navigation.pop();
          }}
        />
      )}
      {error && (
        <MessageBalloon
          title="Atenção"
          text={errorMsg}
          handleConfirmButton={() => {
            setError(false);
          }}
        />
      )}
    </Background>
  );
}

