import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const TitleWrapper = styled.View`
  align-items: center;
  margin-bottom: 20px;
  fontSize: ${RFValue(15)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(28, hp(100))}px;
  color: #000;
  font-family: "Quicksand-Bold";
  margin-left: ${wp(3)}px;
`;

export const TextFieldWrapper = styled.View`
  margin-top: ${hp(0.2)}px;
  margin-bottom: ${hp(0.2)}px;
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

export const HeaderView = styled.View`
  flex-direction: row; 
  justify-content: center; 
  align-items: center;
  margin-top: ${wp(5)}px;
`;

export const RegisterContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: ${wp(1)}px;
`;

export const RegisterRevenueButton = styled.Pressable`
  background-color: #007bff;
  padding: ${wp(2)};
  border-radius: ${wp(1.5)};
  align-items: center;
`;

export const RegisterRevenueText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const TypeLabel = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: ${wp(1)};
`;

export const TypeContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${wp(3)};
  width: ${wp(70)};
  margin-top: ${wp(1)};
  align-items: center;
  align-self: center; 
`;

export const TypeButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 10px;
  border-width: 1px;
  border-color: black;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? '#DE1919' : "transparent")};
`;

export const TypeText = styled.Text<{ selected: boolean }>`
  color: ${(props) => (props.selected ? "white" : "black")};
  font-weight: bold;
`;

