import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Platform, Pressable } from 'react-native';
import { useState } from 'react';
import { Background } from '../../components/Background';
import {
  TextFieldWrapper,
  TitleWrapper,
  ButtonWrapper,
  RegisterContainer,
} from "./styles";

import { NavigationButton } from '../../components/NavigationButton';
import { SubtitleBlue, SubtitleGrey, Title } from '../../styles.Global';
import { TextField } from '../../components/TextField';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const IncomeTypes = {
  SALARY: "Salário",
  BONUS: "Bônus",
  GIFT: "Presente",
  OTHER: "Outros"
};

export default function RegisterIncome() {
  const [data, setData] = useState({
    name: "",
    value: "0,00",
    date: new Date(),
    type: Object.keys(IncomeTypes)[0],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  function updateIncomeData(newData) {
    setData((prevData) => ({ ...prevData, ...newData }));
  }

  const onRegisterPress = async () => {
    if (!data.name || !data.value || !data.date) {
      alert("Preencha todos os campos corretamente!");
      return;
    }
    
    if (data.value == "0,00") {
      alert("É necessário informar o valor da receita!");
      return;
    }

    // Implementar lógica de cadastro
  };

  // Validação do valor (permite apenas números e duas casas decimais)
  const handleValueChange = (text) => {
    // Remover todos os caracteres não numéricos
    let numericText = text.replace(/[^0-9]/g, "");
  
    // Garantir que sempre tenha pelo menos duas casas decimais
    let decimalPart = numericText.slice(-2); // Parte decimal
    let integerPart = numericText.slice(0, -2); // Parte inteira
  
    // Remover zeros à esquerda da parte inteira
    integerPart = integerPart.replace(/^0+/, "");
  
    // Se a parte inteira estiver vazia (no caso de ser apenas zero ou vazio), ajustar para '0'
    if (integerPart === "") {
      integerPart = "0";
    }
  
    // Formatar a parte inteira com separadores de milhar
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
    // Se a parte decimal estiver vazia, adicionar "00"
    if (!decimalPart) {
      decimalPart = "00";
    }
  
    // Concatenar a parte inteira e decimal
    const formattedValue = `${integerPart},${decimalPart}`;
  
    // Atualizar o estado com o valor formatado
    updateIncomeData({ value: formattedValue });
  };  

  // Verificar se os dados são válidos
  const isFormValid = () => {
    const isValueValid = !isNaN(data.value) && data.value.trim() !== "" && parseFloat(data.value) > 0;
    const isDateValid = data.date instanceof Date && !isNaN(data.date);
    const isNameValid = data.name.trim() !== "";
    return isValueValid && isDateValid && isNameValid;
  };

  // Formatar a data para exibição
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Background>
      <TitleWrapper>
        <Title>Cadastro de Receita</Title>
      </TitleWrapper>

      <View style={styles.container}>
        <Text style={styles.text}>Logo</Text>
      </View>

      <TextFieldWrapper>
        <TextField
          required
          label="Nome da Receita"
          placeholder="Digite o nome da receita"
          autoCapitalize="words"
          onChange={(text) => updateIncomeData({ name: text })}
          value={data.name}
        />
      </TextFieldWrapper>
      
      <TextFieldWrapper>
        <TextField
          required
          label="Valor (R$)"
          placeholder="Digite o valor"
          keyboardType="decimal-pad"
          onChange={handleValueChange}
          value={data.value}
        />
      </TextFieldWrapper>

      <TextFieldWrapper>
        <Text style={styles.label}>Data de Efetivação</Text>
        <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>{formatDate(data.date)}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={data.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) updateIncomeData({ date: selectedDate });
            }}
          />
        )}
      </TextFieldWrapper>

      <TextFieldWrapper>
        <Text style={styles.label}>Tipo de Receita</Text>
        <Picker
          selectedValue={data.type}
          onValueChange={(itemValue) => updateIncomeData({ type: itemValue })}
        >
          {Object.entries(IncomeTypes).map(([key, label]) => (
            <Picker.Item key={key} label={label} value={key} />
          ))}
        </Picker>
      </TextFieldWrapper>;

      <ButtonWrapper>
        <NavigationButton
          height={40}
          width={70}
          buttonText="Cadastrar"
          action={onRegisterPress}
          disabled={!isFormValid()} // Desabilitar o botão se os dados não forem válidos
        />
      </ButtonWrapper>

      <RegisterContainer onPress={""}>
        <SubtitleGrey>Ver receitas cadastradas?</SubtitleGrey>
        <SubtitleBlue> Acesse aqui!</SubtitleBlue>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
  },
});