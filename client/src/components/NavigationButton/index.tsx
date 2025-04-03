import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ButtonText } from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

import { useCustomFonts } from "../../utils/fonts";

export interface NavigationButtonProps {
  buttonText: string;
  action: () => void;
  width: number;
  height?: number;
  white?: boolean;
  fontColor?: string; 
  fontSize?: number;
  type?: "expense" | "revenue";
}

export function NavigationButton({
  buttonText,
  action,
  width,
  height = 50,
  white,
  fontSize = RFValue(14),
  type, 
}: NavigationButtonProps) {
  const backgroundColor = type === "expense" 
    ? "#DE1919" 
    : type === "revenue" 
    ? "#3FC44E" 
    : white 
    ? "#FFF" 
    : "rgb(43, 154, 200)";

  const borderColor = white ? "rgb(43, 154, 200)" : "transparent";
  const fontColor = white ? "rgb(43, 154, 200)" : "#FFF";

  const styles = StyleSheet.create({
    button: {
      height: height,
      width: wp(width),
      marginHorizontal: "auto",
      marginTop: hp(1),
      marginBottom: hp(1),
      borderRadius: 1,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
    },
    buttonText: {
      color: fontColor,
      fontSize: fontSize, 
      fontFamily: "Quicksand-Regular"
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={action}>
      <ButtonText style={styles.buttonText}>{buttonText}</ButtonText>
    </TouchableOpacity>
  );
}
