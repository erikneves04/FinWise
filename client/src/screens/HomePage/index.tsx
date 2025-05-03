import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Svg, { G, Path, Polyline, Rect } from 'react-native-svg';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../services/routes';

import { Background } from '../../components/Background';
import Header from '../../components/Header';
import { NavBar } from '../../components/NavBar';

import { CategoryResponse, GetCategories, GetLines, TotalResponse } from '../../services/requests/Statistics/StatisticsServices';
import { useFocusEffect } from '@react-navigation/native';

import { Text as SvgText } from 'react-native-svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomePage">;

type Props = {
  navigation: ScreenNavigationProp;
};

const graphHeight = 175;

function generateMockLineData(month: number, year: number): TotalResponse[] {
  const daysInMonth = new Date(year, month, 0).getDate();

  const data: TotalResponse[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const receita = parseFloat((Math.random() * 500).toFixed(2));
    const despesa = parseFloat((Math.random() * 500).toFixed(2));
    data.push({
      referencia: dateStr,
      valorTotalReceitas: receita,
      valorTotalDespesas: despesa,
    });
  }

  return data;
}

function groupAndAverageData(data: TotalResponse[]): TotalResponse[] {
  if (data.length <= 20) return data;

  const grouped: TotalResponse[] = [];

  for (let i = 0; i < data.length; i += 7) {
    const group = data.slice(i, i + 7);

    const avgReceita = group.reduce((sum, item) => sum + item.valorTotalReceitas, 0) / group.length;
    const avgDespesa = group.reduce((sum, item) => sum + item.valorTotalDespesas, 0) / group.length;

    grouped.push({
      referencia: group[0].referencia, // ou gere uma média da data, se preferir
      valorTotalReceitas: parseFloat(avgReceita.toFixed(2)),
      valorTotalDespesas: parseFloat(avgDespesa.toFixed(2)),
    });
  }

  return grouped;
}

// ---------- Componente principal ----------
export default function HomePage({ navigation }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [graphData, setGraphData] = useState<TotalResponse[]>([]);
  const [pieGraphData, setPieGraphData] = useState<CategoryResponse[]>([]);
  const [showLegend, setShowLegend] = useState(true);

  const screenWidth = Dimensions.get('window').width - 55;
  const pieGraphHeight = 110;

  useEffect(() => {
    const month = currentMonth.getMonth() + 1;
    const year = currentMonth.getFullYear();
    const mockedData = generateMockLineData(month, year);
    setGraphData(groupAndAverageData(mockedData));
  }, [currentMonth]);

  useEffect(() => {
    async function fetchPieData() {
      try {
        const month = currentMonth.getMonth() + 1;
        const year = currentMonth.getFullYear();
        const data = await GetCategories(month, year);
        setPieGraphData(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    fetchPieData();
  }, [currentMonth]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const month = currentMonth.getMonth() + 1;
          const year = currentMonth.getFullYear();
          const [categories] = await Promise.all([
            GetCategories(month, year),
          ]);
          setPieGraphData(categories);
        } catch (error) {
          console.error("Erro ao atualizar dados:", error);
        }
      }

      fetchData();
    }, [currentMonth])
  );

  const changeMonth = (amount: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + amount);
    setCurrentMonth(newDate);
  };

  const maxValue = Math.max(
    ...graphData.map(item => Math.max(item.valorTotalReceitas, item.valorTotalDespesas)),
    1 // evitar divisão por zero
  );

  const receitaPoints = graphData.map((item, index) => {
    const x = (index / (graphData.length - 1)) * screenWidth - 10;
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

  const renderNoDataMessage = () => (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>Não há dados para este mês.</Text>
    </View>
  );

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

          {graphData.length === 0 || pieGraphData.length === 0 ? (
            renderNoDataMessage()
          ) : (
            <>
              {/* Gráfico de Linhas (Receitas e Despesas) */}
              <View style={[styles.graphContainer, { paddingTop: hp(2) }]}>
                <Svg height={hp(33)} width={wp(92)}>
                  {graphData.map((item, index) => {
                    const x = (index / (graphData.length - 1)) * wp(80);
                    const receitaHeight = (item.valorTotalReceitas / maxValue) * graphHeight; // Ajuste para usar hp(30)
                    const despesaHeight = (item.valorTotalDespesas / maxValue) * graphHeight; // Ajuste para usar hp(30)

                    const isReceitaMaior = receitaHeight >= despesaHeight;
                    const despesaY = hp(30) - despesaHeight - 5;

                    // Ajuste das posições de texto de maneira que não sobreponham
                    const minTextDistance = hp(1); // Reduzido de wp(2) para hp(1) (~mais próximo)
                    const receitaTextY = hp(30) - receitaHeight - 8; // Reduzido de -15 para -8
                    const despesaTextY = hp(30) - despesaHeight - 8;

                    let adjustedDespesaTextY = despesaTextY + hp(0.5);
                    let adjustedReceitaTextY = receitaTextY + hp(0.5);

                    if (Math.abs(receitaTextY - despesaTextY) < minTextDistance) {
                      console.log("Colisão detectada entre os textos.");
                      if (isReceitaMaior) {
                        adjustedDespesaTextY = despesaTextY + minTextDistance + hp(0.5);
                      } else {
                        adjustedReceitaTextY = receitaTextY + minTextDistance + hp(0.5);
                      }
                    }
                    return (
                      <React.Fragment key={index}>
                        {isReceitaMaior ? (
                          <>
                            <Rect x={x + 5} y={hp(31) - receitaHeight} width={10} height={receitaHeight} fill="#3FC44E" />
                            <Rect x={x + 10} y={hp(31) - despesaHeight} width={10} height={despesaHeight} fill="#DE1919" />
                          </>
                        ) : (
                          <>
                            <Rect x={x + 3} y={hp(31) - despesaHeight} width={10} height={despesaHeight} fill="#DE1919" />
                            <Rect x={x} y={hp(31) - receitaHeight} width={10} height={receitaHeight} fill="#3FC44E" />
                          </>
                        )}

                        {/* Texto Despesas ajustado */}
                        {item.valorTotalDespesas !== 0.00 && (
                          <SvgText
                            x={x + 20}
                            y={adjustedDespesaTextY}
                            fontSize={wp(3)}
                            fill="#DE1919"
                            fontFamily="Quicksand-Bold"
                            transform={`rotate(-45, ${x + 6}, ${adjustedDespesaTextY})`}
                            textAnchor="start"
                          >
                            {item.valorTotalDespesas.toFixed(2)}
                          </SvgText>
                        )}

                        {/* Texto Receitas ajustado */}
                        {item.valorTotalReceitas !== 0.00 && (
                          <SvgText
                            x={x + 10}
                            y={adjustedReceitaTextY}
                            fontSize={wp(3)}
                            fill="#3FC44E"
                            fontFamily="Quicksand-Bold"
                            transform={`rotate(-45, ${x + 6}, ${adjustedReceitaTextY})`}
                            textAnchor="start"
                          >
                            {item.valorTotalReceitas.toFixed(2)}
                          </SvgText>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {graphData.map((item, index) => {
                    const day = item.referencia.split("-")[2];
                    const x = wp(4) + (index / (graphData.length - 1)) * wp(80);

                    return (
                      <SvgText
                        key={`label-${index}`}
                        x={x}
                        y={hp(32.5)} // ajustado de 15 para 5
                        fontSize={wp(3)}
                        fill="black"
                        textAnchor="middle"
                        fontFamily="Quicksand"
                      >
                        {day}
                      </SvgText>
                    );
                  })}
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
                    <Text style={styles.categoryTitle}>Despesas</Text>

                    {pieSegments.map((segment, index) => (
                      <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: `hsl(${(index * 360) / pieSegments.length}, 100%, 50%)` }]} />
                        <Text style={styles.legendText}>{segment.categoria} - Total: R$ {segment.valor}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </>
          )}
        </View>

        <NavBar />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: hp(17),
    paddingHorizontal: wp(1),
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(10),
  },
  monthText: {
    fontSize: wp(9),
    textTransform: 'capitalize',
    fontFamily: 'Quicksand-Bold',
  },
  arrow: {
    fontSize: 24,
    backgroundColor: 'white',
  },
  graphContainer: {
    marginTop: hp(-1.5),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: hp(1.5),
    borderColor: '#000',
    borderWidth: 2,
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
    borderColor: '#000',
    borderWidth: 2,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendRightContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
    marginLeft: wp(-2),
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'Quicksand-Medium',
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
    fontFamily: 'Quicksand-Bold',
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: graphHeight,
    marginTop: hp(10),
  },
  noDataText: {
    fontSize: wp(8),
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Quicksand-SemiBold',
  },
});
