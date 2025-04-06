import { useState } from "react";
import {
  FlatList,
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { Background } from "../../components/Background";
import { Ionicons } from "@expo/vector-icons";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import {
  HeaderView,
  TitleWrapper,
  Title,
  Table,
  BackgroundWrapper,
} from "./styles";
import BagOfMoney from "../../assets/svg/bagOfMoney";
import { TableRow } from "../../components/TableRow";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const screenWidth = Dimensions.get("window").width;

// Dados de exemplo
const incomesMock = [
  { id: "1", name: "Salário", value: "3.500,00", date: "01/03/2025", type: "Fixo" },
  { id: "2", name: "Freelance", value: "500,00", date: "05/03/2025", type: "Bônus" },
  { id: "3", name: "Investimentos", value: "1.200,00", date: "10/03/2025", type: "Outros" },
];

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "IncomeList"
>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function IncomeList({ navigation }: Props) {
  const [incomes, setIncomes] = useState(incomesMock);
  const [viewMode, setViewMode] = useState("table");
  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: string) => {
    setIncomes((prev) => prev.filter((item) => item.id !== id));
    setShowModal(false);

    alert('Delete acionado mas a ação ainda não foi implementada.')
  };

  const confirmDelete = (income: any) => {
    setSelectedIncome(income);
    setShowModal(true);
  };

  const handleEdit = (income: any) => {
    navigation.navigate("RegisterIncome", { income });
  };

  return (
    <Background>
      <BackgroundWrapper>
        <TitleWrapper>
          <HeaderView>
            <BagOfMoney height={50} width={40} />
            <Title>Receitas</Title>
          </HeaderView>
        </TitleWrapper>
      </BackgroundWrapper>

      {viewMode === "table" ? (
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeader}>
              <Text style={{ color: "#fff", fontFamily: "Quicksand-Bold" }}>Nome</Text>
              <Text style={{ color: "#fff", fontFamily: "Quicksand-Bold" }}>Valor</Text>
              <Text style={{ color: "#fff", fontFamily: "Quicksand-Bold" }}>Data</Text>
              <Text style={{ color: "#fff", fontFamily: "Quicksand-Bold" }}>Tipo</Text>
            </View>
            <TableRow name={"Salário"} value={"3.500,00"} date={"01/03/2025"} type={"Fixo"} />
            <TableRow name={"Freelance"} value={"500,00"} date={"05/03/2025"} type={"Bônus"} />
            <TableRow name={"Investimentos"} value={"1.200,00"} date={"10/03/2025"} type={"Outros"} />
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={incomes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>💰 <Text style={styles.bold}>Valor:</Text> R$ {item.value}</Text>
                <Text>📅 <Text style={styles.bold}>Data:</Text> {item.date}</Text>
                <Text>🔖 <Text style={styles.bold}>Tipo:</Text> {item.type}</Text>
              </View>
          
              <View style={styles.actions}>
                <Pressable onPress={() => handleEdit(item)} style={styles.editBtn}>
                  <Ionicons name="create-outline" size={20} color="white" />
                </Pressable>
                <Pressable onPress={() => confirmDelete(item)} style={styles.deleteBtn}>
                  <Ionicons name="trash-outline" size={20} color="white" />
                </Pressable>
              </View>
            </View>
          )}          
        />
      )}

      <Pressable
        style={styles.toggleFab}
        onPress={() => setViewMode(viewMode === "table" ? "card" : "table")}
      >
        <Ionicons name={viewMode === "table" ? "grid" : "list"} size={28} color="white" />
      </Pressable>

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate("RegisterIncome")}
      >
        <Ionicons name="add" size={32} color="white" />
      </Pressable>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            {selectedIncome && (
              <>
                <Text>Você deseja excluir a receita abaixo?</Text>
                <Text><Text style={styles.bold}>Nome:</Text> {selectedIncome.name}</Text>
                <Text><Text style={styles.bold}>Valor:</Text> R$ {selectedIncome.value}</Text>
                <Text><Text style={styles.bold}>Data:</Text> {selectedIncome.date}</Text>
                <Text><Text style={styles.bold}>Tipo:</Text> {selectedIncome.type}</Text>
              </>
            )}
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setShowModal(false)} style={styles.cancelBtn}>
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => handleDelete(selectedIncome.id)} style={styles.confirmBtn}>
                <Text style={{ color: "#fff" }}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Background>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3FC44E",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: wp(95),
    marginTop: 15,
    justifyContent: "space-around",
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  cancelBtn: {
    backgroundColor: "#999",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  confirmBtn: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
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
    justifyContent: "space-between",
  },
  
  actions: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 10,
  },
  
  editBtn: {
    backgroundColor: "#3FC44E",
    padding: 8,
    borderRadius: 5,
    width: 40,
    alignItems: "center",
  },
  
  deleteBtn: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 5,
    width: 40,
    alignItems: "center",
  }  
});