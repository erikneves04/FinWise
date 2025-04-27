import React, { useEffect, useState } from "react";
import { View } from "react-native";

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
import { RootStackParamList } from "../../services/routes";
import { useAuth } from "../../services/context/AuthContext";
import { GetUser } from "../../services/requests/User/GetUser";
import { handleApiError } from "../../utils/functions";
import { Loading } from "../../components/Loading";
import { MessageBalloon } from "../../components/MessageBallon";
import { UpdateUser, UpdateUserData } from "../../services/requests/User/UpdateUser";

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
  const [data, setData] = useState<UpdateUserData>({
    nome: "",
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { token } = useAuth();

  function updateRegisterData(newLoginData: Partial<UpdateUserData>) {
   
    if (!data) return;
    setData({ ...data, ...newLoginData });
  }

  const getUserFunction = async () => {
    try {
      setLoading(true);
      const data = await GetUser(token!);
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

  useEffect(() => {
    getUserFunction();
  }, []);

  const onUpdatePress = async () => {
    try {
      setLoading(true);
      console.log(data);
      await UpdateUser(data); 
      setLoading(false);
      navigation.navigate("MyData");
    } catch (err: any) {
      setLoading(false);
      const errorHandled = handleApiError(err);
      setErrorMsg(
        typeof errorHandled === "string"
          ? errorHandled
          : errorHandled.message || "Erro desconhecido"
      );
      setError(true);
    }
  };

  return (
    <Background>
      {loading && <Loading />}
      <Modal height="55">
        <LogoItem height={120} />
        {/* <Divider /> */}
        <Title>Meus Dados</Title>
        <View>
          <TextFieldWrapper>
            <TextField
              placeholder="Digite aqui o seu nome completo"
              onChange={(text) => updateRegisterData({ nome: text })}
              fontSize={14}
              editable
              label="Nome"
              value={data.nome}
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextField
              placeholder="Digite aqui o seu email completo"
              onChange={(text) => updateRegisterData({ email: text })}
              fontSize={14}
              editable
              label="Email"
              value={data.email}
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