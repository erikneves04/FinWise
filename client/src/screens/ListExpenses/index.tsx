import { useState } from "react";
import { FlatList, Text, View, Pressable, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Background } from "../../components/Background";
import { Ionicons } from "@expo/vector-icons";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';
import { HeaderView, TitleWrapper, Title, Table, BackgroundWrapper } from "./styles";
import BagOfMoney from "../../assets/svg/bagOfMoney";
import { TableRow } from "../../components/TableRow";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Quicksand_700Bold } from "@expo-google-fonts/quicksand";

const screenWidth = Dimensions.get("window").width;

// Dados de exemplo
const incomesMock = [
  { id: "1", name: "Salário", value: "3.500,00", date: "01/03/2025", type: "Fixo" },
  { id: "2", name: "Freelance", value: "500,00", date: "05/03/2025", type: "Bônus" },
  { id: "3", name: "Investimentos", value: "1.200,00", date: "10/03/2025", type: "Outros" },
];

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ExpenseList"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function ExpenseList({ navigation }: Props) {
  const [incomes, setIncomes] = useState(incomesMock);
  const [viewMode, setViewMode] = useState("table");

  return (
    <Background>
      <BackgroundWrapper>
        <TitleWrapper>
          <HeaderView>
            <BagOfMoney height={50} width={40} expense />
            <Title>Despesas</Title>
          </HeaderView>
        </TitleWrapper>
      </BackgroundWrapper>
      {viewMode === "table" ? (
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeader}>
              <Text style={{color: "#fff", fontFamily: "Quicksand-Bold"}}>Nome</Text>
              <Text style={{color: "#fff", fontFamily: "Quicksand-Bold"}}>Valor</Text>
              <Text style={{color: "#fff", fontFamily: "Quicksand-Bold"}}>Data</Text>
              <Text style={{color: "#fff", fontFamily: "Quicksand-Bold"}}>Tipo</Text>
            </View>
            <TableRow name={"Salário"} value={"3.500,00"} date={"01/03/2025"} type={"Fixo"} />
            <TableRow name={"Salário"} value={"3.500,00"} date={"01/03/2025"} type={"Fixo"} />
            <TableRow name={"Salário"} value={"3.500,00"} date={"01/03/2025"} type={"Fixo"} />
            {/* <FlatList
              data={incomes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Table>
                  <Text style={[styles.cell, { width: 120 }]}>{item.name}</Text>
                  <Text style={[styles.cell, { width: 100 }]}>R$ {item.value}</Text>
                  <Text style={[styles.cell, { width: 100 }]}>{item.date}</Text>
                  <Text style={[styles.cell, { width: 100 }]}>{item.type}</Text>
                </Table>
              )}
            /> */}
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

      <Pressable style={styles.toggleFab} onPress={() => setViewMode(viewMode === "table" ? "card" : "table")}>
        <Ionicons name={viewMode === "table" ? "grid" : "list"} size={28} color="white" />
      </Pressable>

      <Pressable style={styles.fab} onPress={() => navigation.navigate("RegisterIncome")}>
        <Ionicons name="add" size={32} color="white" />
      </Pressable>
    </Background>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    // backgroundColor: "#007bff",
    backgroundColor: "#DE1919",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: wp(95),
    marginTop: 15,
    justifyContent: "space-around"
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
    width: screenWidth - 10,
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
    alignSelf: "center",
    width: screenWidth - 10,
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
  toggleFab: {
    position: "absolute",
    left: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
