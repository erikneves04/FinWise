import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Background } from '../../components/Background';
import {
  TextFieldWrapper,
  TitleWrapper,
  ButtonWrapper,
  RegisterContainer,
  SubtitleWrapper,
} from "./styles";

import { NavigationButton} from '../../components/NavigationButton';
import { inputMasks } from "../../utils/inputMasks";
import { SubtitleBlue, SubtitleGrey, Title } from '../../styles.Global';
import { TextField } from '../../components/TextField';

export default function Register() {
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
      // navigation.navigate("ConfirmRegister");
    } catch (err: any) {
     
    }
  };

  return (
    <Background>
      <TitleWrapper>
          <Title>Cadastro de usuário</Title>
        </TitleWrapper>

      <View style={styles.container}>
        <Text style={styles.text}>Logo</Text>
      </View>

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
          label="Celular"
          value={data.cellNumber}
          onChange={(text) => updateRegisterData({ cellNumber: text })}
          placeholder="Digite aqui seu celular (xx) xxxxx-xxxx"
          keyboardType="number-pad"
          maxLength={15}
          mask={inputMasks.phone}
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

