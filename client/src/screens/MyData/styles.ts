import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const TitleWrapper = styled.View`
  margin-top: ${hp(2)};
  margin-bottom: ${hp(1)};
  align-items: center;
`;

export const SubtitleWrapper = styled.View`
  margin-top: ${hp(1)}px;
  margin-bottom: ${hp(1.5)}px;
  width: ${wp(85)}px;
  flex-direction: row;
  justify-content: center;
`;

export const TextButonWrapper = styled.TouchableOpacity`
  margin-top: ${hp(1)}px;
  margin-bottom: ${hp(1.5)}px;
  width: ${wp(70)}px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ButtonWrapper = styled.View`
  margin-top: ${hp(1)}px;
`;


export const TextFieldWrapper = styled.View`
  margin-top: ${hp(0.2)}px;
  margin-bottom: ${hp(0.2)}px;
`;

export const RegisterContainer = styled.TouchableOpacity`
  margin-top: ${hp(1)}px;
  flex-direction: row;
`;

export const MainView = styled.View`
  align-items: center;
  top: ${hp(3)}px;
`;

export const TextBlack = styled.Text`
  color: black;
  font-size: ${RFValue(15, hp(100))}px;
  font-family: "Quicksand-Medium";
  color: #1A1A1A;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24, hp(100))}px;
  color: #000;
  font-family: "Quicksand-Medium";
`;