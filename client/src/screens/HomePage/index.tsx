import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Svg, { Line, Polyline } from 'react-native-svg';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';

import { Background } from '../../components/Background';
import Header from '../../components/Header';
import { NavBar } from '../../components/NavBar';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePage"
>;

type Props = {
  navigation: ScreenNavigationProp;
};

// Simulando resposta da API
const apiData = [
  { referencia: '2025-04-01', valorTotalReceitas: 1000, valorTotalDespesas: 500 },
  { referencia: '2025-04-02', valorTotalReceitas: 1500, valorTotalDespesas: 700 },
  { referencia: '2025-04-03', valorTotalReceitas: 1200, valorTotalDespesas: 800 },
  { referencia: '2025-04-04', valorTotalReceitas: 2000, valorTotalDespesas: 600 },
  { referencia: '2025-04-05', valorTotalReceitas: 1700, valorTotalDespesas: 900 },
];

export default function HomePage({ navigation }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [graphData, setGraphData] = useState(apiData);

  const screenWidth = Dimensions.get('window').width - 40; // padding horizontal
  const graphHeight = 150;

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const generateCompleteGraphData = () => {
    const days = daysInMonth(currentMonth);
    const dataMap = new Map(graphData.map(item => [new Date(item.referencia).getDate(), item]));

    const completeData = Array.from({ length: days }, (_, i) => {
      const day = i + 1;
      const data = dataMap.get(day);
      return {
        referencia: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0],
        valorTotalReceitas: data ? data.valorTotalReceitas : 0,
        valorTotalDespesas: data ? data.valorTotalDespesas : 0,
      };
    });

    return completeData;
  };

  const completeGraphData = generateCompleteGraphData();

  const changeMonth = (amount: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + amount);
    setCurrentMonth(newDate);
    // TODO: Fazer nova chamada à API para atualizar o graphData
  };

  const maxValue = Math.max(
    ...completeGraphData.map(item => Math.max(item.valorTotalReceitas, item.valorTotalDespesas)),
    1 // evitar divisão por 0
  );

  const receitaPoints = completeGraphData.map((item, index) => {
    const x = (index / (completeGraphData.length - 1)) * screenWidth;
    const y = graphHeight - (item.valorTotalReceitas / maxValue) * graphHeight;
    return `${x},${y}`;
  }).join(' ');

  const despesaPoints = completeGraphData.map((item, index) => {
    const x = (index / (completeGraphData.length - 1)) * screenWidth;
    const y = graphHeight - (item.valorTotalDespesas / maxValue) * graphHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <Background>
      <View style={{ flex: 1 }}>
        <Header />

        <View style={styles.contentContainer}>
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <Text style={styles.arrow}>⬅️</Text>
            </TouchableOpacity>

            <Text style={styles.monthText}>
              {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </Text>

            <TouchableOpacity onPress={() => changeMonth(1)}>
              <Text style={styles.arrow}>➡️</Text>
            </TouchableOpacity>
          </View>

          {/* Gráfico */}
          <View style={styles.graphContainer}>
            <Svg height={graphHeight} width={screenWidth}>
              {/* Linha Receitas */}
              <Polyline
                points={receitaPoints}
                fill="none"
                stroke="green"
                strokeWidth="2"
              />
              {/* Linha Despesas */}
              <Polyline
                points={despesaPoints}
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
            </Svg>

            <View style={styles.legendContainer}>
              <View style={[styles.legendDot, { backgroundColor: 'green' }]} />
              <Text style={styles.legendText}>Receitas</Text>

              <View style={[styles.legendDot, { backgroundColor: 'red', marginLeft: 20 }]} />
              <Text style={styles.legendText}>Despesas</Text>
            </View>
          </View>
        </View>

        <NavBar />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 135,
    paddingHorizontal: 20,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  arrow: {
    fontSize: 24,
  },
  graphContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    marginLeft: 5,
  },
});