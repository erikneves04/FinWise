import { useState } from "react";
import { FlatList, Text, View, Pressable, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Background } from "../../components/Background";
import { TitleWrapper, ButtonWrapper } from "./styles";
import { Title } from "../../styles.Global";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

// Dados de exemplo
const incomesMock = [
  { id: "1", name: "Salário", value: "3.500,00", date: "01/03/2025", type: "Fixo" },
  { id: "2", name: "Freelance", value: "500,00", date: "05/03/2025", type: "Bônus" },
  { id: "3", name: "Investimentos", value: "1.200,00", date: "10/03/2025", type: "Outros" },
];

export default function IncomeList({ navigation }) {
  const [incomes, setIncomes] = useState(incomesMock);
  const [viewMode, setViewMode] = useState("table"); // "table" ou "card"

  return (
    <Background>
      <TitleWrapper>
        <Title>Receitas Cadastradas</Title>
      </TitleWrapper>

      {/* Botão para Alternar Visualização */}
      <Pressable style={styles.toggleButton} onPress={() => setViewMode(viewMode === "table" ? "card" : "table")}>
        <Text style={styles.toggleButtonText}>
          Alternar para {viewMode === "table" ? "Lista" : "Tabela"}
        </Text>
      </Pressable>

      {viewMode === "table" ? (
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, { width: 120 }]}>Nome</Text>
              <Text style={[styles.headerText, { width: 100 }]}>Valor</Text>
              <Text style={[styles.headerText, { width: 100 }]}>Data</Text>
              <Text style={[styles.headerText, { width: 100 }]}>Tipo</Text>
            </View>
            <FlatList
              data={incomes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, { width: 120 }]}>{item.name}</Text>
                  <Text style={[styles.cell, { width: 100 }]}>R$ {item.value}</Text>
                  <Text style={[styles.cell, { width: 100 }]}>{item.date}</Text>
                  <Text style={[styles.cell, { width: 100 }]}>{item.type}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={incomes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text>💰 <Text style={styles.bold}>Valor:</Text> R$ {item.value}</Text>
              <Text>📅 <Text style={styles.bold}>Data:</Text> {item.date}</Text>
              <Text>🔖 <Text style={styles.bold}>Tipo:</Text> {item.type}</Text>
            </View>
          )}
        />
      )}

      {/* Botão Flutuante para Adicionar Receita */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate("Cadastro de receitas")}>
        <Ionicons name="add" size={32} color="white" />
      </Pressable>
    </Background>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: screenWidth - 5,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 2,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: screenWidth - 5,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: "90%",
    alignSelf: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
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
