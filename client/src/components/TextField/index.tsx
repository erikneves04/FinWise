import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MaskInput, { MaskInputProps } from "react-native-mask-input";
import DateTimePicker from "@react-native-community/datetimepicker";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import {
  DynamicInputView,
  InputView,
  Label,
  RequiredField,
} from "../TextField/styles";
import { TextStyle } from "react-native";

interface Props {
  required?: boolean;
  secureTextEntry?: boolean;
  value: string;
  onChange: (masked: string, unmasked: string) => void;
  placeholder: string;
  isDatePicker?: boolean;
  width?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  textContentType?: string;
  keyboardType?: string;
  autoCorrect?: boolean;
  autoComplete?: string;
  maxLength?: number;
  editable?: boolean;
  multiline?: boolean;
  inputHeight?: number;
  label?: string;
  fontSize?: number;
  fontWeight?: number;
  marginRight?: number;
}

export function TextField({
  required = false,
  secureTextEntry = false,
  value = "",
  onChange,
  placeholder,
  isDatePicker = false,
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
  const [showDatePicker, setShowDatePicker] = useState(false);

  const styles = StyleSheet.create({
    inputStyle: {
      fontWeight: fontWeight as TextStyle["fontWeight"],
      color: "black",
      width: wp(width ? parseFloat(width) - 10 : 100),
      marginLeft: 10,
      fontSize: fontSize,
      fontFamily: "Quicksand-Regular",
    } as TextStyle,
    placeholderStyle: {
      color: "gray",
      fontSize: fontSize,
      fontFamily: "Quicksand-Regular",
    },
  });

  return (
    <View style={{ marginBottom: 5, marginRight: marginRight ?? 0 }}>
      {label && <Label>{label}</Label>}
      <DynamicInputView width={width} height={inputHeight}>
        {required && <RequiredField>*</RequiredField>}

        {isDatePicker ? (
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={{ padding: 10 }}
          >
            {value ? (
              <Text style={styles.inputStyle}>{value}</Text>
            ) : (
              <Text style={styles.placeholderStyle}>{placeholder}</Text>
            )}
          </Pressable>
        ) : (
          <MaskInput
            value={value}
            placeholder={placeholder}
            style={[styles.inputStyle, { textAlign: "left", textAlignVertical: "center" }]}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            textContentType={textContentType}
            keyboardType={keyboardType}
            autoCorrect={autoCorrect}
            autoComplete={autoComplete}
            maxLength={maxLength}
            editable={editable}
            multiline={multiline}
            scrollEnabled={!multiline}
            numberOfLines={1}
          />
        )}
      </DynamicInputView>

      {showDatePicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const localDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
              );

              const formattedDate = localDate.toISOString().split("T")[0];
              onChange(formattedDate, formattedDate);
            }
          }}

        />
      )}
    </View>
  );
}
