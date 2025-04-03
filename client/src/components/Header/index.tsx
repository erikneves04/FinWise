import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import LogoItem from "../../assets/svg/logo";
import { StyledContainer, Data, TextDataView, TitleWrapper, HeaderView, Title } from "./styles";
import { SubtitleBlue } from "../../screens/styles.Global";
import { useNavigation } from "@react-navigation/native";

export interface HeaderProps {
  myData?: boolean;
}

export default function Header({ myData }: HeaderProps) {
  const navigation = useNavigation();


  return (
    <StyledContainer>
        <TitleWrapper>
          <HeaderView>
            <LogoItem height={60} />
            <Title>Visualização de Gráficos</Title>
          </HeaderView>
        </TitleWrapper>
      <Data onPress={() => navigation.navigate("MyData")}>
        <Icon name="user" size={17} color="#20C1D2" />
        <TextDataView>
          <SubtitleBlue>Meus Dados</SubtitleBlue>
        </TextDataView>
      </Data>
    </StyledContainer>
  );
}
