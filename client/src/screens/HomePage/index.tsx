import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Svg, { G, Path, Polyline } from 'react-native-svg';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';

import { Background } from '../../components/Background';
import Header from '../../components/Header';
import { NavBar } from '../../components/NavBar';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomePage">;

type Props = {
  navigation: ScreenNavigationProp;
};

const apiData = [
  { referencia: '2025-04-01', valorTotalReceitas: 1000, valorTotalDespesas: 500 },
  { referencia: '2025-04-02', valorTotalReceitas: 1500, valorTotalDespesas: 700 },
  { referencia: '2025-04-03', valorTotalReceitas: 1200, valorTotalDespesas: 800 },
  { referencia: '2025-04-04', valorTotalReceitas: 2000, valorTotalDespesas: 600 },
  { referencia: '2025-04-05', valorTotalReceitas: 1700, valorTotalDespesas: 900 },
];

const pieData = [
  { categoria: 'AAA', valorTotal: 500 },
  { categoria: 'BBB', valorTotal: 300 },
  { categoria: 'CCC', valorTotal: 200 },
  { categoria: 'DDD', valorTotal: 200 },
];

export default function HomePage({ navigation }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [graphData, setGraphData] = useState(apiData);
  const [pieGraphData, setPieGraphData] = useState(pieData);
  const [showLegend, setShowLegend] = useState(true);

  const screenWidth = Dimensions.get('window').width - 55; 
  const graphHeight = 150;
  const pieGraphHeight = 150;

  const changeMonth = (amount: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + amount);
    setCurrentMonth(newDate);
  };

  const maxValue = Math.max(
    ...graphData.map(item => Math.max(item.valorTotalReceitas, item.valorTotalDespesas))
  );

  const receitaPoints = graphData.map((item, index) => {
    const x = (index / (graphData.length - 1)) * screenWidth;
    const y = graphHeight - (item.valorTotalReceitas / maxValue) * graphHeight;
    return `${x},${y}`;
  }).join(' ');

  const despesaPoints = graphData.map((item, index) => {
    const x = (index / (graphData.length - 1)) * screenWidth;
    const y = graphHeight - (item.valorTotalDespesas / maxValue) * graphHeight;
    return `${x},${y}`;
  }).join(' ');

  const totalValue = pieGraphData.reduce((sum, item) => sum + item.valorTotal, 0);
  let startAngle = 0;

  const pieSegments = pieGraphData.map(item => {
    const value = (item.valorTotal / totalValue) * 360;
    const endAngle = startAngle + value;
    const largeArcFlag = value > 180 ? 1 : 0;
    const x1 = Math.cos((startAngle - 90) * (Math.PI / 180)) * pieGraphHeight / 2 + pieGraphHeight / 2;
    const y1 = Math.sin((startAngle - 90) * (Math.PI / 180)) * pieGraphHeight / 2 + pieGraphHeight / 2;
    const x2 = Math.cos((endAngle - 90) * (Math.PI / 180)) * pieGraphHeight / 2 + pieGraphHeight / 2;
    const y2 = Math.sin((endAngle - 90) * (Math.PI / 180)) * pieGraphHeight / 2 + pieGraphHeight / 2;

    startAngle = endAngle;

    const d = `M${pieGraphHeight / 2},${pieGraphHeight / 2} L${x1},${y1} A${pieGraphHeight / 2},${pieGraphHeight / 2} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
    
    return { path: d, categoria: item.categoria, valor: item.valorTotal };
  });

  const toggleLegend = () => {
    setShowLegend(prevState => !prevState);
  };

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

          {/* Gráfico de Linhas (Receitas e Despesas) */}
          <View style={styles.graphContainer}>
            <Svg height={graphHeight} width={screenWidth}>
              <Polyline
                points={receitaPoints}
                fill="none"
                stroke="green"
                strokeWidth="2"
                onPress={toggleLegend}
              />
              <Polyline
                points={despesaPoints}
                fill="none"
                stroke="red"
                strokeWidth="2"
                onPress={toggleLegend}
              />
            </Svg>

            {showLegend && (
              <View style={styles.legendContainer}>
                <View style={[styles.legendDot, { backgroundColor: 'green' }]} />
                <Text style={styles.legendText}>Receitas</Text>

                <View style={[styles.legendDot, { backgroundColor: 'red', marginLeft: 20 }]} />
                <Text style={styles.legendText}>Despesas</Text>
              </View>
            )}
          </View>

          {/* Gráfico de Pizza e Legenda ao lado direito */}
          <View style={styles.pieGraphContainer}>
            <Svg height={pieGraphHeight} width={pieGraphHeight}>
              {pieSegments.map((segment, index) => (
                <G key={index}>
                  <Path
                    d={segment.path}
                    fill={`hsl(${(index * 360) / pieSegments.length}, 100%, 50%)`}
                    onPress={toggleLegend}
                  />
                </G>
              ))}
            </Svg>

            {showLegend && (
              <View style={styles.legendRightContainer}>
                {/* Título das Categorias */}
                <Text style={styles.categoryTitle}>Categorias</Text>

                {pieSegments.map((segment, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: `hsl(${(index * 360) / pieSegments.length}, 100%, 50%)` }]} />
                    <Text style={styles.legendText}>{segment.categoria} ({segment.valor})</Text>
                  </View>
                ))}
              </View>
            )}
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
    marginBottom: 20,
  },
  pieGraphContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  legendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendRightContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
});
