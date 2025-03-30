import { useState } from "react";
import { FlatList, Text, View, Pressable, StyleSheet } from "react-native";
import { Background } from "../../components/Background";
import { TitleWrapper, ButtonWrapper } from "./styles";
import { Title } from "../styles.Global";
import { Ionicons } from "@expo/vector-icons"; 

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';

const initialIncomes = [
  { id: "1", name: "Salário", value: "3.500,00", date: "01/03/2025", type: "Salário" },
  { id: "2", name: "Bônus", value: "500,00", date: "05/03/2025", type: "Bônus" },
  { id: "3", name: "Freelance", value: "1.200,00", date: "10/03/2025", type: "Outros" },
];

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "IncomeList"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function IncomeList({ navigation } : Props) {
  const [incomes, setIncomes] = useState(initialIncomes);

  return (
    <Background>
      <TitleWrapper>
        <Title>Receitas Cadastradas</Title>
      </TitleWrapper>

      {/* Lista de Receitas */}
      <FlatList
        data={incomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.incomeItem}>
            <Text style={styles.incomeName}>{item.name}</Text>
            <Text style={styles.incomeValue}>R$ {item.value}</Text>
            <Text style={styles.incomeDate}>{item.date}</Text>
            <Text style={styles.incomeType}>{item.type}</Text>
          </View>
        )}
      />

      {/* Botão Flutuante para Adicionar Receita */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate("Cadastro de receitas")}>
        <Ionicons name="add" size={32} color="white" />
      </Pressable>
    </Background>
  );
}

const styles = StyleSheet.create({
  incomeItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: "100%",
  },
  incomeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  incomeValue: {
    fontSize: 16,
    color: "#007AFF",
  },
  incomeDate: {
    fontSize: 14,
    color: "#666",
  },
  incomeType: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});