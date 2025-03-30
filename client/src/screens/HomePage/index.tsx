import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';

import { Background } from '../../components/Background';

import { NavigationButton} from '../../components/NavigationButton';
import { inputMasks } from "../../utils/inputMasks";
import { SubtitleBlue, SubtitleGrey, Title } from '../styles.Global';
import { TextField } from '../../components/TextField';
import { ButtonWrapper, RegisterContainer, TextFieldWrapper, TitleWrapper } from './styles';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePage"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function HomePage({navigation} : Props) {
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

  const onRevenuePress = async () => {
    try {
      navigation.navigate("RegisterIncome");
    } catch (err: any) {
     
    }
  };

  const onCreateRevenuePress = async () => {
    try {
      navigation.navigate("IncomeList");
    } catch (err: any) {
     
    }
  };

  return (
    <Background>
      <TitleWrapper>
          <Title>Cadastro de usuário</Title>
        </TitleWrapper>

      <ButtonWrapper>
          <NavigationButton
            height={40}
            width={70}
            buttonText="Cadastrar Receitas"
            action={onCreateRevenuePress}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <NavigationButton
            height={40}
            width={70}
            buttonText="Receitas"
            action={onRevenuePress}
          />
        </ButtonWrapper>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 200,
    backgroundColor: '#F0F0F0', 
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 20,
  },
  text: {
    textAlign: 'center', 
  },
});

