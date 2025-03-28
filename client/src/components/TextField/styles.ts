import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  small?: boolean;
  width?: string;
  height?: number;
}

export const InputView = styled.View<Props>`
  display: flex;
  flex-direction: row;
  width: ${(props: any) => (props.small ? wp("50%") : wp("90%"))}px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 1px;
`;

export const DynamicInputView = styled.View<Props>`
  display: flex;
  flex-direction: row;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 10px;
  width: ${(props: any) => wp(props.width!)}px;
  height: ${(props: any) => hp(props.height)!}px;
`;

export const RequiredField = styled.Text`
  color: red;
  padding-left: ${wp(3)}px;
  align-self: center;
`;

export const Label = styled.Text`
  color: black;
  font-size: ${RFValue(12)}px;
  margin-bottom: ${wp(2)}px;
  font-weight: 500;
  font-family: "Quicksand-Bold";
`;
