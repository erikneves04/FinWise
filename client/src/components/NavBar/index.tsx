import { BackgroundWrapper, ButtonWrapper, WhiteBackground, WhiteCard } from "./styles";


import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationButton } from "../NavigationButton";

export function NavBar() {
  const navigation = useNavigation();

  const onRevenuePress = async () => {
    try {
      navigation.navigate("IncomeList");
    } catch (err: any) {

    }
  };

  const onCreateRevenuePress = async () => {
    try {
      navigation.navigate("RegisterIncome");
    } catch (err: any) {

    }
  };


  const onCreateExpensePress = async () => {
    try {
      navigation.navigate("RegisterExpense");
    } catch (err: any) {

    }
  };

  const onExpensePress = async () => {
    try {
      navigation.navigate("ExpenseList");
    } catch (err: any) {

    }
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <BackgroundWrapper>
          <WhiteBackground>
            <View>
                <NavigationButton
                  height={40}
                  width={40}
                  buttonText="Cadastrar Receitas"
                  type="revenue"
                  action={onCreateRevenuePress}
                />
                <NavigationButton
                  height={40}
                  width={40}
                  buttonText="Receitas"
                  type="revenue"
                  action={onRevenuePress}
                />
            </View>

            <View>
                <NavigationButton
                  height={40}
                  width={40}
                  buttonText="Cadastrar Despesas"
                  type="expense"
                  action={onCreateExpensePress}
                />
                <NavigationButton
                  height={40}
                  width={40}
                  buttonText="Despesas"
                  type="expense"
                  action={onExpensePress}
                />
            </View>
          </WhiteBackground>
        </BackgroundWrapper>
      </View>
    </>
  );
}
