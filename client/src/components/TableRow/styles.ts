import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

export const BackgroundWrapper = styled.View`
  width: ${wp(95)}px;
  height: ${hp(5)}px;
  border-radius: 10px;
  background-color: white;
  justify-content: center;
  elevation: 12;
  margin-bottom: ${hp(1)}px;
  margin-top: ${hp(1)}px;
  align-self: center;
`;

export const CentralView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: ${wp(95)}px;
`;

export const FieldWork = styled.Text`
  font-size: ${RFValue(18, hp(100))}px;
  color: #969696;
  font-weight: 400;
  margin-bottom: ${wp(1)}px;
`;

export const CreatReport = styled.Text`
  font-size: ${RFValue(14, hp(100))};
  color:#B87F3D;
`;

export const Cell = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${RFValue(14, hp(100))}px;
  font-family: "Quicksand-SemiBold";
  flex-wrap: wrap;
  text-align-vertical: center;
`




