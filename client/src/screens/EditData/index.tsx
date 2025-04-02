import React, {  useState } from "react";
import { View} from "react-native";

import LogoItem from "../../assets/svg/logo";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { NavigationButton } from "../../components/NavigationButton";
import { Background } from "../../components/Background";
import { TextField } from "../../components/TextField";
import { Modal } from "../../components/Modal";

import { TextFieldWrapper } from "../Login/styles";
// import { Divider } from "../stylesGlobal";
import { Title } from "./style";

import { inputMasks } from "../../utils/inputMasks";

type ScreenRouteProp = RouteProp<RootStackParamList, "EditData">;

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditData"
>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function EditData({ navigation, route }: Props) {
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


  const onUpdatePress = async () => {
    try {
      navigation.navigate("ConfirmRegister");
    } catch (err: any) {

    }
  };

  return (
    <Background>
      <Modal height="63">
        <LogoItem height={120}/>
        {/* <Divider /> */}
        <Title>Meus Dados</Title>
        <View>
          <TextFieldWrapper>
            <TextField
              placeholder="Digite aqui o seu nome completo"
              value={""}
              onChange={(text) => updateRegisterData({ name: text })}
              fontSize={14}
              editable
              label="Nome Completo"
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextField
              keyboardType="numeric"
              placeholder="Digite aqui o seu numero de telefone"
              value={""}
              onChange={(text) => updateRegisterData({ cellNumber: text })}
              fontSize={14}
              editable
              mask={inputMasks.phone}
              label="Telefone"
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextField
              keyboardType="numeric"
              placeholder="Digite aqui a sua data de nascimento"
              fontSize={14}
              value={""}
              onChange={(text) => updateRegisterData({ birthdate: text })}
              editable
              label="Data de nascimento"
            />
          </TextFieldWrapper>
        </View>
        <NavigationButton
          buttonText="Salvar"
          action={onUpdatePress}
          width={70}
          height={35}
        />
      </Modal>
    </Background>
  );
}