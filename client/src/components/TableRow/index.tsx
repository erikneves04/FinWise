import { View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { widthPercentageToDP } from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/FontAwesome";

import {
  BackgroundWrapper,
  CentralView,
  FieldWork,
  CreatReport,
  Cell,
} from "./styles";

type Props = {
  name: string;
  value: string;
  date: string;
  type:string;
};

export function TableRow({ name, value, date, type}: Props) {
  return (
    <BackgroundWrapper>
      <CentralView>
          <Cell>{name}</Cell>
          <Cell>R$ {value}</Cell>
          <Cell>{date}</Cell>
          <Cell >{type}</Cell>
      </CentralView>
    </BackgroundWrapper>
  );
}
