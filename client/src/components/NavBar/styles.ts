import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const WhiteBackground = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${wp(90)}px;
`;

export const BackgroundWrapper = styled.View`
  width: ${wp(100)}px;
  height: ${hp(16)}px;
  background-color: white;
  justify-content: center;
  align-items: center;
  elevation: 24;
`;

export const WhiteCard = styled.TouchableOpacity`
  width: ${hp(13)}px;
  height: ${hp(13)}px;
  background-color: white;
  justify-content: center;
  align-items: center;
  elevation: 5;
  padding: ${hp(1)}px;
`;

export const TextFieldWrapper = styled.View`
  margin-top: ${hp(0.2)}px;
  margin-bottom: ${hp(0.2)}px;
`;

export const TitleWrapper = styled.View`
  margin-top: ${hp(0.5)};
  margin-bottom: ${hp(3)};
`;

export const SubtitleWrapper = styled.View`
  margin-bottom: ${hp(3)};
  width: ${wp(75)};
  align-items: center;
`;

export const RegisterContainer = styled.TouchableOpacity`
  margin-top: ${hp(1)}px;
  align-items: center;
  justify-content: flex-start;
`;