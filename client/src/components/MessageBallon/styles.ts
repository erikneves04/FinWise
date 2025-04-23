import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

interface ButtonTextProps {
  redConfirm?: boolean;
}

export const BackgroundDark = styled.TouchableOpacity`
  width: 140%;
  height: 140%;
  position: absolute;
  z-index: 6;
  background-color: black;
  opacity: 0.5;
`;

export const BalloonContainer = styled.View`
  position: absolute;
  top: ${hp("40%")}px;
  z-index: 10;
  
`;

export const WhiteBackground = styled.View`
  width: ${RFValue(200)}px;
  background-color: white;
  border-radius: 10px;
  z-index: 10;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #E60B18;
  font-weight: bold;
  text-align: center;
  margin-top: ${RFValue(10)}px;
`;

export const BalloonText = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;
  padding: ${RFValue(10)}px;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-top-width: 1px;
  border-top-color: gray;
`;

export const MiddleLine = styled.View`
  background: gray;
  height: 100%;
  width: 1px;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
 
  font-size: ${RFValue(14)}px;
  text-align: center;
  margin: auto;
  color: #B87F3D;
  
`;

export const ButtonTouchable = styled.TouchableOpacity`
  height: ${RFValue(40)}px;
  width: 100%;
`;

export const ButtonTouchableFlex = styled.TouchableOpacity`
  height: ${RFValue(40)}px;
  width: 50%;
`;