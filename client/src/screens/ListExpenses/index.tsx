import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Background } from "../../components/Background";
import { Ionicons } from "@expo/vector-icons";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../services/routes";
import {
  HeaderView,
  TitleWrapper,
  Title,
  BackgroundWrapper,
  ButtonWrapper,
} from "./styles";
import BagOfMoney from "../../assets/svg/bagOfMoney";
import { TableRow } from "../../components/TableRow";

import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ExpenseTypes } from '../../utils/types';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const screenWidth = Dimensions.get("window").width;

import { GetExpenses, DeleteExpense } from '../../services/requests/Expense/ExpenseServices';
import { Loading } from '../../components/Loading';
import { handleApiError } from '../../utils/functions';
import { MessageBalloon } from '../../components/MessageBallon';
import { NavigationButton } from "../../components/NavigationButton";

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ExpenseList"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function ExpenseList({ navigation }: Props) {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("table");

  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const data = await GetExpenses();
      if (Array.isArray(data)) {
        setExpenses(data);
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
      loadExpenses();
    }, [])
  );


  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await DeleteExpense(id);
      setExpenses((prev) => prev.filter((item) => item.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
      alert("Erro ao deletar a despesa.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (expense: any) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const handleEdit = (expense: any) => {
    navigation.navigate("RegisterExpense", { expense });
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
            <BagOfMoney height={50} width={40} expense />
            <Title>Despesas</Title>
          </HeaderView>
        </TitleWrapper>
      </BackgroundWrapper>

      {viewMode === "table" ? (
        <ScrollView horizontal >
          <View>
            <View style={styles.tableHeader}>
              <Text style={{ color: "#fff", fontFamily: "Quicksand-Bold" }}>Nome</Text>
              <Text style={{ color: "#fff", fontFamily: "Quicksand-Bold" }}>Valor</Text>
              <Text style={{ color: "#fff", fontFamily: "Quicksand-Bold" }}>Data</Text>
              <Text style={{ color: "#fff", fontFamily: "Quicksand-Bold" }}>Tipo</Text>
            </View>
            {expenses.map((item) => (
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
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>💰 <Text style={styles.bold}>Valor:</Text> R$ {item.value}</Text>
                <Text>📅 <Text style={styles.bold}>Data:</Text> {item.date}</Text>
                <Text>🔖 <Text style={styles.bold}>Tipo:</Text> {item.type}</Text>
              </View>
              <View style={styles.actionButtons}>
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

      <ButtonWrapper>
        <NavigationButton
          height={40}
          width={50}
          buttonText="Visualizar gráficos"
          action={onHomePagePress}
        />
      </ButtonWrapper>

      {showModal && selectedExpense && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.cardTitle}>Confirmar exclusão</Text>
            <Text>    Nome: {selectedExpense.name}</Text>
            <Text>💰 Valor: R$ {selectedExpense.value}</Text>
            <Text>📅 Data: {selectedExpense.date}</Text>
            <Text>🔖 Tipo: {selectedExpense.type}</Text>

            <View style={styles.modalButtons}>
              <Pressable onPress={() => setShowModal(false)} style={styles.cancelBtn}>
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => handleDelete(selectedExpense.id)} style={styles.confirmBtn}>
                <Text style={{ color: "#fff" }}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <Pressable
        style={styles.toggleFab}
        onPress={() => setViewMode(viewMode === "table" ? "card" : "table")}
      >
        <Ionicons name={viewMode === "table" ? "grid" : "list"} size={28} color="white" />
      </Pressable>

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate("RegisterExpense", { expense: undefined })}
      >
        <Ionicons name="add" size={32} color="white" />
      </Pressable>
    </Background>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#DE1919",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: wp(95),
    marginTop: 15,
    justifyContent: "space-around",
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
    flexDirection: "row",
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
  actionButtons: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  iconButton: {
    padding: 5,
    alignItems: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  modalBtnCancel: {
    marginRight: 15,
  },
  modalBtnDelete: {
    backgroundColor: "#DE1919",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
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
});