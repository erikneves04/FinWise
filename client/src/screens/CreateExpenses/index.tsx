import { StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';
import {
  ButtonWrapper,
  HeaderView,
  RegisterContainer,
  TextFieldWrapper,
  Title,
  TitleWrapper,
  TypeButton,
  TypeContainer,
  TypeLabel,
  TypeText
} from "./styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

import { SubtitleBlue, SubtitleGrey } from '../styles.Global';
import moment from 'moment';
import BagOfMoney from '../../assets/svg/bagOfMoney';
import { Modal } from '../../components/Modal';
import { TextField } from '../../components/TextField';
import { formatInputDate, handleValueChange } from '../../utils/functions';
import { NavigationButton } from '../../components/NavigationButton';

const screenWidth = Dimensions.get("window").width;
const ExpenseTypes = ['Alimentação', 'Fixo', 'Transporte', 'Lazer', 'Outros'];

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterExpense"
>;

type ExpenseRouteProp = RouteProp<RootStackParamList, "RegisterExpense">;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function RegisterExpense({ navigation }: Props) {
  const route = useRoute<ExpenseRouteProp>();
  const isEditing = !!route.params?.expense;

  const [incomeData, setExpenseData] = useState({
    id: "",
    name: "",
    value: "",
    date: "",
    type: "",
  });

  useEffect(() => {
    if (route.params?.expense) {
      // converter de "DD/MM/YYYY" para "YYYY-MM-DD"
      const [day, month, year] = route.params.expense.date.split("/");
      const unmaskedDate = `${year}-${month}-${day}`;
      setExpenseData({
        ...route.params.expense,
        date: unmaskedDate,
      });
      
    }
  }, []);

  const formatDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const onCreatePress = async () => {
    if (!incomeData.name || !incomeData.value || !incomeData.date || !incomeData.type) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if (incomeData.value == "0,00") {
      alert("É necessário informar o valor da despesa!");
      return;
    }

    if (isEditing) {
      alert("Edição acionada mas ainda não implementada!");
      // TODO: lógica de edição
    } else {
      alert("Cadastro acionado mas ainda não implementado!");
      // TODO: lógica de criação
    }

    navigation.navigate("ExpenseList");
  };

  return (
    <Background>
      <Modal height='73'>
        <TitleWrapper>
          <HeaderView>
            <BagOfMoney height={50} width={40} expense />
            <Title>{isEditing ? "Editar despesa" : "Criar despesa"}</Title>
          </HeaderView>
        </TitleWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Despesa"
            placeholder="Digite aqui o nome da despesa"
            autoCapitalize="words"
            onChange={(text) => setExpenseData({ ...incomeData, name: text })}
            value={incomeData.name}
          />
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField
            required
            label="Valor"
            placeholder="Digite aqui o valor da despesa"
            autoCapitalize="words"
            keyboardType="numeric"
            onChange={(text: string) =>
              setExpenseData((prevData) => ({
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
              setExpenseData((prevData) => ({
                ...prevData,
                date: unmasked,
              }))
            }
            isDatePicker={true}
          />
        </TextFieldWrapper>

        <TypeLabel>Tipo:</TypeLabel>
        <TypeContainer>
          {ExpenseTypes.map((type) => (
            <TypeButton
              key={type}
              onPress={() => setExpenseData({ ...incomeData, type })}
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
            buttonText={isEditing ? "Salvar" : "Cadastrar"}
            action={onCreatePress}
          />
        </ButtonWrapper>

        {!isEditing && (
          <RegisterContainer onPress={() => navigation.navigate("ExpenseList")}>
            <SubtitleGrey>Ver despesas cadastradas?</SubtitleGrey>
            <SubtitleBlue> Acesse aqui!</SubtitleBlue>
          </RegisterContainer>
        )}
      </Modal>
    </Background>
  );
}

const styles = StyleSheet.create({
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