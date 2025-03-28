import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

export const Divider = styled.View`
  margin-top: ${wp(5)}px;
  margin-bottom: ${wp(5)}px;
  height: 0.5px;
  width: ${wp(65)}px;
  background-color: #969696;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24, hp(100))}px;
  color: #000;
  font-family: "Quicksand-Regular";
`;

export const TitleGrey = styled.Text`
  font-size: ${RFValue(24, hp(100))}px;
  color: #FFF;
`;

export const SubtitleGrey = styled.Text`
  font-size: ${RFValue(15, hp(100))}px;
  text-align: center;
  color: #969696;
  font-family: "Quicksand-Regular";
`;

export const NavbarTitle = styled.Text`
  margin-top: ${wp(2)}px;
  font-size: ${RFValue(12, hp(100))}px;
  text-align: center;
  color: #969696;
`;

export const SubtitleBlue = styled.Text`
  font-size: ${RFValue(15, hp(100))}px;
  color: #2B9AC8;
  font-family: "Quicksand-Regular";
`;

export const SubtitleBlack = styled.Text`
  color: black;
  font-size: ${RFValue(15, hp(100))}px;
`;
