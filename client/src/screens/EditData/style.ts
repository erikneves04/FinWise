import styled from "styled-components/native";


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export const Title = styled.Text`
  font-size: ${wp(5)}px;
  margin: ${hp(2)}px;
`;
