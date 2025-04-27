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
  MainView,
  TextButonWrapper,
  TextBlack,
  Title,
} from "./styles";

import { NavigationButton } from '../../components/NavigationButton';
import { inputMasks } from "../../utils/inputMasks";
import { SubtitleBlack, SubtitleBlue, SubtitleGrey } from '../styles.Global';
import { TextField } from '../../components/TextField';
import { Modal } from '../../components/Modal';

import {
  GetUser,
  GetUserData
} from "../../services/requests/User/GetUser";

import { Loading } from "../../components/Loading";
import { handleApiError } from "../../utils/functions";
import { MessageBalloon } from "../../components/MessageBallon";

import { UpdateUser } from '../../services/requests/User/UpdateUser';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyData"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function MyData({ navigation }: Props) {
  const [data, setData] = useState({
    nome: "",
    email: "",
  });



  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const getUserFunction = async () => {
    try {
      setLoading(true);
      const data = await GetUser();
      if (data) {
        setData(data);
      }
      setLoading(false);
    } catch (err: any) {
      const errorHandled = handleApiError(err);
      setErrorMsg(
        typeof errorHandled === "string"
          ? errorHandled
          : errorHandled.message || "Erro desconhecido"
      );
      setError(true);
      setLoading(false);
    }
  };

  useFocusEffect(
      useCallback(() => {
        getUserFunction();
      }, [])
    );

  const onMyDataPress = async () => {
    try {
      setLoading(true);
      await UpdateUser(data);
      navigation.navigate("EditData");
    } catch (err: any) {

    }
  };

  return (
    <Background>
      {loading && <Loading />}
      <Modal height='50' width='90'>
        <MainView>
          <LogoItem height={120} />

          <TitleWrapper>
            <Title>Meus Dados</Title>
          </TitleWrapper>
          <SubtitleWrapper>
            {/* <Icon name="user" size={17} color="#656565" /> */}
            <TextBlack> Nome: {data.nome} </TextBlack>
          </SubtitleWrapper>
          <SubtitleWrapper>
            {/* <Icon name="envelope" size={17} color="#656565" /> */}
            <TextBlack> Email: {data.email} </TextBlack>
          </SubtitleWrapper>

          <ButtonWrapper>
            <NavigationButton
              height={40}
              width={70}
              buttonText="Editar Dados"
              action={onMyDataPress}
            />
          </ButtonWrapper>
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
    </Background>
  );
}

