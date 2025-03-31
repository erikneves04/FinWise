import { MaskInputProps } from "react-native-mask-input";
import MaskInput from "react-native-mask-input";

import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { DynamicInputView, InputView, Label, RequiredField } from "../TextField/styles";
import { TextStyle } from "react-native";
import { useCustomFonts } from "../../utils/fonts";

interface Props {
  required?: boolean;
  secureTextEntry?: boolean;
  value: string;
  onChange: (masked: string, unmasked: string) => void;
  onContentSizeChange?: (event: any) => void;
  placeholder: string;
  mask?: (string | RegExp)[] | null;
  width?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  textContentType?:
  | "none"
  | "URL"
  | "addressCity"
  | "addressCityAndState"
  | "addressState"
  | "countryName"
  | "creditCardNumber"
  | "emailAddress"
  | "familyName"
  | "fullStreetAddress"
  | "givenName"
  | "jobTitle"
  | "location"
  | "middleName"
  | "name"
  | "namePrefix"
  | "nameSuffix"
  | "nickname"
  | "organizationName"
  | "postalCode"
  | "streetAddressLine1"
  | "streetAddressLine2"
  | "sublocality"
  | "telephoneNumber"
  | "username"
  | "password"
  | "newPassword"
  | "oneTimeCode"
  | undefined;
  keyboardType?:
  | "default"
  | "number-pad"
  | "decimal-pad"
  | "numeric"
  | "email-address"
  | "phone-pad"
  | undefined;
  autoCorrect?: boolean;
  autoComplete?:
  | "birthdate-day"
  | "birthdate-full"
  | "birthdate-month"
  | "birthdate-year"
  | "cc-csc"
  | "cc-exp"
  | "cc-exp-day"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-number"
  | "email"
  | "gender"
  | "name"
  | "name-family"
  | "name-given"
  | "name-middle"
  | "name-middle-initial"
  | "name-prefix"
  | "name-suffix"
  | "password"
  | "password-new"
  | "postal-address"
  | "postal-address-country"
  | "postal-address-extended"
  | "postal-address-extended-postal-code"
  | "postal-address-locality"
  | "postal-address-region"
  | "postal-code"
  | "street-address"
  | "sms-otp"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-device"
  | "username"
  | "username-new"
  | "off";
  maxLength?: number;
  editable?: boolean;
  multiline?: boolean;
  inputHeight?: number;
  label?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: boolean;
  marginRight?: number;
}

interface Styles {
  inputStyle: MaskInputProps;
}

export function TextField({
  required = false,
  secureTextEntry = false,
  value = "",
  onChange,
  onContentSizeChange,
  placeholder,
  mask,
  width = "70",
  autoCapitalize = "sentences",
  textContentType = "none",
  keyboardType = "default",
  autoCorrect = true,
  autoComplete = "off",
  maxLength = 50,
  editable = true,
  multiline = false,
  inputHeight = 5,
  label,
  fontSize = 15,
  fontWeight = 300,
  marginRight,
}: Props) {

  const styles = StyleSheet.create({
    inputStyle: {
      fontWeight: fontWeight as TextStyle["fontWeight"], 
      color: "black",
      width: wp(width ? parseFloat(width) - 10 : 100),
      marginLeft: 10,
      fontSize: fontSize,
      fontFamily: "Quicksand-Regular", // Usando a fonte Quicksand
    } as TextStyle, // Garante que siga a tipagem correta
  });

  return (
    <View style={{ marginBottom: 5, marginRight: marginRight !== undefined ? marginRight : 0 }}>
      {label && <Label>{label}</Label>}
      <DynamicInputView width={width} height={inputHeight}>
        {required && <RequiredField>*</RequiredField>}
        <MaskInput
          value={value}
          placeholder={placeholder}
          style={styles.inputStyle}
          onChangeText={onChange}
          onContentSizeChange={onContentSizeChange}
          mask={mask ?? undefined}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          textContentType={textContentType}
          keyboardType={keyboardType}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          maxLength={maxLength}
          editable={editable}
          multiline={multiline}
          scrollEnabled={true}
        />
      </DynamicInputView>
    </View>
  );
}
