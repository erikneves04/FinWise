import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { Background } from '../../components/Background';
import {
  ButtonWrapper,
  HeaderView,
  RegisterContainer,
  Title,
  TitleWrapper,
  TypeButton,
  TypeContainer,
  TypeLabel,
  TypeText,
} from "./styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

import { SubtitleBlue, SubtitleGrey } from '../styles.Global';
import moment from 'moment';
import BagOfMoney from '../../assets/svg/bagOfMoney';
import { Modal } from '../../components/Modal';
import { TextField } from '../../components/TextField';
import { formatInputDate, handleValueChange } from '../../utils/functions';
import { NavigationButton } from '../../components/NavigationButton';

const screenWidth = Dimensions.get("window").width;
const IncomeTypes = ['Salário', 'Freelancer', 'Fixo', 'Bônus', 'Outros'];

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "RegisterIncome">;
type ScreenRouteProp = RouteProp<RootStackParamList, "RegisterIncome">;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function RegisterIncome({ navigation, route }: Props) {
  const isEditMode = route.params?.income !== undefined;
  const [incomeData, setIncomeData] = useState({
    id: '',
    name: '',
    value: '',
    date: '',
    type: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const { income } = route.params;
  
      // converter de "DD/MM/YYYY" para "YYYY-MM-DD" (ou só unmasked)
      const [day, month, year] = income.date.split("/");
      const unmaskedDate = `${year}-${month}-${day}`;
  
      setIncomeData({
        ...income,
        date: unmaskedDate, // o componente espera isso
      });
    }
  }, []);
  
  const formatDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const updateIncomeData = (newData: any) => {
    setIncomeData({ ...incomeData, ...newData });
  };

  const onSubmit = () => {
    if (!incomeData.name || !incomeData.value || !incomeData.date || !incomeData.type) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if (incomeData.value === "0,00") {
      alert("É necessário informar o valor da receita!");
      return;
    }

    if (isEditMode) {
      // TODO: Lógica para editar
      alert("Botão de edição pressionado, mas a rota ainda não foi implementada!");
    } else {
      // TODO: Lógica para cadastrar
      alert("Botão de cadastro pressionado, mas a rota ainda não foi implementada!");
    }

    navigation.navigate("IncomeList");
  };

  return (
    <Background>
      <Modal height='73'>
        <TitleWrapper>
          <HeaderView>
            <BagOfMoney height={50} width={40} />
            <Title>{isEditMode ? "Editar receita" : "Criar receita"}</Title>
          </HeaderView>
        </TitleWrapper>

        <TextField
          required
          label="Receita"
          placeholder="Digite aqui o nome da receita"
          autoCapitalize="words"
          onChange={(text) => updateIncomeData({ name: text })}
          value={incomeData.name}
        />

        <TextField
          required
          label="Valor"
          placeholder="Digite aqui o valor da receita"
          keyboardType="numeric"
          onChange={(text: string) =>
            updateIncomeData({ value: handleValueChange(text) })
          }
          value={incomeData.value}
        />

        <TextField
          required
          label="Data"
          placeholder="Selecionar data"
          value={incomeData.date ? formatDate(incomeData.date) : ""}
          onChange={(masked, unmasked) =>
            updateIncomeData({ date: unmasked })
          }
          isDatePicker={true}
        />

        <TypeLabel>Tipo:</TypeLabel>
        <TypeContainer>
          {IncomeTypes.map((type) => (
            <TypeButton
              key={type}
              onPress={() => updateIncomeData({ type })}
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
            buttonText={isEditMode ? "Salvar" : "Cadastrar"}
            action={onSubmit}
          />
        </ButtonWrapper>

        {!isEditMode && (
          <RegisterContainer onPress={() => navigation.navigate("IncomeList")}>
            <SubtitleGrey>Ver receitas cadastradas?</SubtitleGrey>
            <SubtitleBlue> Acesse aqui!</SubtitleBlue>
          </RegisterContainer>
        )}
      </Modal>
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
