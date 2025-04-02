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

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyData"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function MyData({ navigation }: Props) {
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

  const onMyDataPress = async () => {
    try {
      navigation.navigate("HomePage");
    } catch (err: any) {

    }
  };

  return (
    <Background>
      <Modal height='50'>
        <MainView>
          <LogoItem height={120} />

          <TitleWrapper>
            <Title>Meus Dados</Title>
          </TitleWrapper>
          <SubtitleWrapper>
            {/* <Icon name="user" size={17} color="#656565" /> */}
            <TextBlack> Nome: xxxxxxxxxx </TextBlack>
          </SubtitleWrapper>
          <SubtitleWrapper>
            {/* <Icon name="envelope" size={17} color="#656565" /> */}
            <TextBlack> Email: xxxxxxxxxx </TextBlack>
          </SubtitleWrapper>

          {data.cellNumber && (
            <SubtitleWrapper>
              {/* <Icon name="phone" size={17} color="#656565" /> */}
              <TextBlack> Celular: xxxxxxxxxx </TextBlack>
            </SubtitleWrapper>
          )}

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
    </Background>
  );
}

