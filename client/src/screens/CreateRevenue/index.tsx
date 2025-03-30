import { StyleSheet, Text, View, TextInput, Platform, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Background } from '../../components/Background';
import { RegisterContainer } from "./styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';

import { SubtitleBlue, SubtitleGrey, Title } from '../styles.Global';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { TitleWrapper } from '../Register/styles';

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

  const handleValueChange = (text:any) => {
    let numericText = text.replace(/[^0-9]/g, "");
    let decimalPart = numericText.slice(-2);
    let integerPart = numericText.slice(0, -2).replace(/^0+/, "");
    if (integerPart === "") integerPart = "0";
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (!decimalPart) decimalPart = "00";
    const formattedValue = `${integerPart},${decimalPart}`;
    setIncomeData({ ...incomeData, value: formattedValue });
  };

  const formatDate = (date:any) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const updateIncomeData = (newData:any) => {
    setIncomeData({ ...incomeData, ...newData });
  };

  return (
    <Background>
      <TitleWrapper>
        <Text>Criar receita</Text>
      </TitleWrapper>

      <View style={styles.container}>
        <Text style={styles.text}>Logo</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={incomeData.name}
            onChangeText={(text) => setIncomeData({ ...incomeData, name: text })}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Valor:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={incomeData.value}
            onChangeText={handleValueChange}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Data:</Text>
          <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
            <Text style={styles.dateText}>{incomeData.date ? formatDate(incomeData.date) : 'Selecionar data'}</Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={incomeData.date ? new Date(incomeData.date) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) updateIncomeData({ date: selectedDate });
              }}
            />
          )}
        </View>

        <Text style={styles.typeLabel}>Tipo:</Text>
        <View style={styles.typeContainer}>
          {IncomeTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.typeButton, incomeData.type === type && styles.selectedType]}
              onPress={() => setIncomeData({ ...incomeData, type })}
            >
              <Text style={styles.typeText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Pressable style={styles.saveButton} onPress={onCreatePress}>
          <Text style={styles.saveButtonText}>Cadastrar</Text>
        </Pressable>

        <RegisterContainer onPress={() => navigation.navigate("IncomeList")}>
          <SubtitleGrey>Ver receitas cadastradas?</SubtitleGrey>
          <SubtitleBlue> Acesse aqui!</SubtitleBlue>
        </RegisterContainer>
      </View>
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
