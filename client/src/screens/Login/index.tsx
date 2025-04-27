import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';
import LogoItem from '../../assets/svg/logo';
import Spinner from "react-native-loading-spinner-overlay";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Background } from '../../components/Background';
import {
  TextFieldWrapper,
  TitleWrapper,
  ButtonWrapper,
  RegisterContainer,
  MainView
} from "./styles";

import { LoginData, Login } from "../../services/requests/User/Login";

import { NavigationButton } from '../../components/NavigationButton';
import { inputMasks } from "../../utils/inputMasks";
import { SubtitleBlue, SubtitleGrey, Title } from '../styles.Global';
import { TextField } from '../../components/TextField';
import { Modal } from '../../components/Modal';
import { handleApiError } from '../../utils/functions';
import { Loading } from '../../components/Loading';
import { MessageBalloon } from '../../components/MessageBallon';
import { useAuth } from '../../services/context/AuthContext';


type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [data, setData] = useState<LoginData>({
    email: "",
    senha: ""
  });

  const [errorMsg, setErrorMsg] = useState<string>(
    "E-mail ou Senha incorretos."
  );

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { setIsSignedIn, setToken } = useAuth();

  function updateLoginData(newLoginData: Partial<LoginData>) {
    if (!data) return;
    setData({ ...data, ...newLoginData });
  }

  const onLoginPress = async () => {
    try {
      setIsLoading(true);
      const response = await Login(data);
      const token = response.access_token;

      if (token) {
        setToken(token);
        setIsSignedIn(true);
      } else {
        throw new Error("Token inválido");
      }

      setIsLoading(false);
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setErrorMsg(errorMessage.message || 'Erro desconhecido');
      setError(true);
      setIsLoading(false);
    }
  };

  const onRegisterPress = async () => {
    try {
      navigation.navigate("Register");
    } catch (err: any) {

    }
  };

  return (
    <Background>
      {isLoading && <Loading />}
      <Modal height='60' borderRadius={3}>
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
              onChange={(text) => updateLoginData({ email: text })}
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
              onChange={(text) => updateLoginData({ senha: text })}
              value={data.senha}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              <FontAwesome
                name={showPassword ? "eye-slash" : "eye"}
                size={18}
                color="#000"
              />
            </TouchableOpacity>
          </TextFieldWrapper>

          <ButtonWrapper>
            <NavigationButton
              height={40}
              width={70}
              buttonText="Entrar"
              action={onLoginPress}
            />
            <Spinner visible={isLoading} />
          </ButtonWrapper>
          <RegisterContainer onPress={onRegisterPress}>
            <SubtitleGrey>Não tem conta?</SubtitleGrey>
            <SubtitleBlue> Cadastre-se!</SubtitleBlue>
          </RegisterContainer>
        </MainView>
      </Modal>
      {error && (
        <MessageBalloon
          title="Atenção"
          text={errorMsg}
          handleConfirmButton={() => {
            setError(false);
          }}
        />
      )}
    </Background >
  );
}

const styles = StyleSheet.create({
  showPasswordButton: {
    position: "absolute",
    top: 36,
    right: 15,
    zIndex: 1,
  },
});


