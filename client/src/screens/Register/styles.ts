import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const TextFieldWrapper = styled.View`
  margin-top: ${hp(0.2)}px;
  margin-bottom: ${hp(0.2)}px;
`;

export const ButtonWrapper = styled.View`
  margin-top: ${hp(2)}px;
`;

export const TitleWrapper = styled.View`
  margin-top: ${hp(0.5)};
  margin-bottom: ${hp(3)};
  align-items: center;
`;

export const SubtitleWrapper = styled.View`
  margin-bottom: ${hp(3)};
  width: ${wp(75)};
  align-items: center;
`;

export const RegisterContainer = styled.TouchableOpacity`
  margin-top: ${hp(1)}px;
  flex-direction: row;
`;

export const MainView = styled.View`
  align-items: center;
  top: ${hp(3)}px;
`;