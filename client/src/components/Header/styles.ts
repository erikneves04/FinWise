import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const StyledContainer = styled.View`
  position: absolute;
  top: ${hp(0)}px;
  width: ${wp(100)}px;
  height: ${hp(18)}px;
  flex-direction: column; /* Alinha os itens verticalmente */
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.92;
  elevation: 24;
  z-index: 2;
`;

export const TitleWrapper = styled.View`
  margin-top: ${hp(0.5)}px;
  margin-bottom: ${hp(3)}px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HeaderView = styled.View`
  flex-direction: column; /* Empilha o logo e o título */
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const Data = styled.TouchableOpacity`
  position: absolute;
  bottom: ${hp(1)}px;
  right: ${wp(2)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${wp(1)}px;
`;

export const TextDataView = styled.View`
  margin-left: ${wp(1)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24, hp(100))}px;
  color: #000;
  font-family: "Quicksand-Bold";
`;
