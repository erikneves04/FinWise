import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const screenWidth = Dimensions.get("window").width;

export const BackgroundWrapper = styled.View`
  top: ${hp(2)};
  width: ${wp(92)}px;
  height: ${hp(13)}px;
  border-radius: 10px;
  background-color: white;
  justify-content: center;
  elevation: 12;
  margin-bottom: ${hp(3)}px;
  margin-top: ${hp(1)}px;
  align-self: center;
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const TitleWrapper = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(28, hp(100))}px;
  color: #000;
  font-family: "Quicksand-Bold";
  margin-left: ${wp(3)}px;
`;

export const TextFieldWrapper = styled.View`
  margin-bottom: 15px;
`;

export const ButtonWrapper = styled.View`
  margin-top: 20px;
  align-items: center;
`;

export const DropdownWrapper = styled.View`
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 25%;
`;

export const RegisterContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
`;

export const Table = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding-vertical: 10px;
  padding-horizontal: 5px;
  margin-vertical: 2px;
  border-radius: 5px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 2px;
  elevation: 2; 
  width: ${screenWidth - 10}px;
`;

export const TableRow = styled.Text<{ bold?: boolean; large?: boolean }>`
  font-size: ${(props) => (props.large ? "18px" : "14px")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  text-align: center;
`;

export const HeaderView = styled.View`
  flex-direction: row; 
  justify-content: center; 
  align-items: center;
  margin-top: ${wp(5)}px;
`;