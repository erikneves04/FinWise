import React, { useState, useEffect, useCallback } from "react";
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
  ButtonWrapper,
} from "./styles";
import BagOfMoney from "../../assets/svg/bagOfMoney";
import { TableRow } from "../../components/TableRow";
import { RevenueTypes } from "../../utils/types";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const screenWidth = Dimensions.get("window").width;

import { GetRevenues, DeleteRevenue } from "../../services/requests/Revenue/RevenueServices";
import { Loading } from '../../components/Loading';
import { handleApiError } from '../../utils/functions';
import { MessageBalloon } from '../../components/MessageBallon';
import { useFocusEffect } from "@react-navigation/native";
import { NavigationButton } from "../../components/NavigationButton";

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "IncomeList"
>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function IncomeList({ navigation }: Props) {
  const [incomes, setIncomes] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("table");

  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadRevenues = async () => {
    setLoading(true);
    try {
      const data = await GetRevenues();
      if (Array.isArray(data)) {
        setIncomes(data);
      } else {
        console.error("Dados inválidos recebidos:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRevenues();
    }, [])
  );

  const handleDelete = (id: string) => {
    setIncomes((prev) => prev.filter((item) => item.id !== id));
    setShowModal(false);

    DeleteRevenue(id)
  };

  const confirmDelete = (income: any) => {
    setSelectedIncome(income);
    setShowModal(true);
  };

  const handleEdit = (income: any) => {
    navigation.navigate("RegisterIncome", { income });
  };

  const onHomePagePress = async () => {
    navigation.navigate("HomePage");
  };

  return (
    <Background>
      {loading && <Loading />}
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
            {incomes.map((item) => (
              <TableRow
                key={item.id}
                name={item.name}
                value={item.value}
                date={item.date}
                type={item.type}
              />
            ))}
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
          contentContainerStyle={{ paddingBottom: 100 }}
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
        onPress={() => navigation.navigate("RegisterIncome", { income: undefined })}
      >
        <Ionicons name="add" size={32} color="white" />
      </Pressable>

      <ButtonWrapper>
        <NavigationButton
          height={40}
          width={50}
          buttonText="Visualizar gráficos"
          action={onHomePagePress}
        />
      </ButtonWrapper>

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
                <Text><Text style={styles.bold}>    Nome:</Text> {selectedIncome.name}</Text>
                <Text><Text style={styles.bold}>💰 Valor:</Text> R$ {selectedIncome.value}</Text>
                <Text><Text style={styles.bold}>📅 Data:</Text> {selectedIncome.date}</Text>
                <Text><Text style={styles.bold}>🔖 Tipo:</Text> {selectedIncome.type}</Text>
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center"
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