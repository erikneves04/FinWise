import { StyleSheet, Text, View, TextInput, Platform, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Background } from '../../components/Background';
import { ButtonWrapper, HeaderView, RegisterContainer, RegisterRevenueButton, RegisterRevenueText, TextFieldWrapper, Title, TitleWrapper, TypeButton, TypeContainer, TypeLabel, TypeText } from "./styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';

import { SubtitleBlue, SubtitleGrey } from '../styles.Global';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LogoItem from '../../assets/svg/logo';
import BagOfMoney from '../../assets/svg/bagOfMoney';
import { Modal } from '../../components/Modal';
import { TextField } from '../../components/TextField';
import { formatInputDate, handleValueChange } from '../../utils/functions';
import { NavigationButton } from '../../components/NavigationButton';

const screenWidth = Dimensions.get("window").width;
const IncomeTypes = ['Salário', 'Freelancer', 'Fixo', 'Bônus', 'Outros']

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterIncome"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function RegisterIncome({ navigation }: Props) {
  const [incomeData, setIncomeData] = useState({
    name: "",
    value: "",
    date: "",
    type: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onCreatePress = async () => {
    if (!incomeData.name || !incomeData.value || !incomeData.date || !incomeData.type) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if (incomeData.value == "0,00") {
      alert("É necessário informar o valor da receita!");
      return;
    }

    // TODO: Lógica de cadastro
    alert("BOTÃO DE CADASTRO ACIONADO MAS AINDA NÃO IMPLEMENTADO!");
  };

  const formatDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const onRegisterRevenuePress = async () => {
    navigation.navigate("IncomeList")
  }

  const updateIncomeData = (newData: any) => {
    setIncomeData({ ...incomeData, ...newData });
  };

  return (
    <Background>
      <Modal height='73'>
        <TitleWrapper>
          <HeaderView>
            <BagOfMoney height={50} width={40} />
            <Title>Criar receita</Title>
          </HeaderView>
        </TitleWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Receita"
            placeholder="Digite aqui o nome da receita"
            autoCapitalize="words"
            onChange={(text) => setIncomeData({ ...incomeData, name: text })}
            value={incomeData.name}
          />
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Valor"
            placeholder="Digite aqui o valor da receita"
            autoCapitalize="words"
            keyboardType="numeric"
            onChange={(text: string) =>
              setIncomeData((prevData) => ({
                ...prevData,
                value: handleValueChange(text),
              }))
            }
            value={incomeData.value}
          />
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Data"
            placeholder="Selecionar data"
            value={incomeData.date ? formatDate(incomeData.date) : ""}
            onChange={(masked, unmasked) =>
              setIncomeData((prevData) => ({
                ...prevData,
                date: unmasked,
              }))
            }
            isDatePicker={true}
          />
        </TextFieldWrapper>

        <TypeLabel>Tipo:</TypeLabel>
        <TypeContainer>
          {IncomeTypes.map((type) => (
            <TypeButton
              key={type}
              onPress={() => setIncomeData({ ...incomeData, type })}
              selected={incomeData.type === type}
            >
              <TypeText selected={incomeData.type === type}>{type}</TypeText>
            </TypeButton>
          ))}
        </TypeContainer>

        <ButtonWrapper>
          <NavigationButton
            height={40}
            width={70}
            buttonText="Cadastrar"
            action={onRegisterRevenuePress}
          />
        </ButtonWrapper>

        <RegisterContainer onPress={() => navigation.navigate("IncomeList")}>
          <SubtitleGrey>Ver receitas cadastradas?</SubtitleGrey>
          <SubtitleBlue> Acesse aqui!</SubtitleBlue>
        </RegisterContainer>
      </Modal>
    </Background >
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
  formContainer: {
    padding: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: screenWidth - 20
  },
  label: {
    textAlign: "right",
    width: 80,
    marginRight: 10,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#ccc",
  },
  typeLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 2,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  typeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  selectedType: {
    backgroundColor: "black",
  },
  typeText: {
    color: "white",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
