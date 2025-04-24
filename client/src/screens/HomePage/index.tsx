import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../App';

import { Background } from '../../components/Background';

import { NavigationButton } from '../../components/NavigationButton';
import { inputMasks } from "../../utils/inputMasks";
import { SubtitleBlue, SubtitleGrey, Title } from '../styles.Global';
import { TextField } from '../../components/TextField';
import { ButtonWrapper, RegisterContainer, TextFieldWrapper, TitleWrapper } from './styles';
import { Modal } from '../../components/Modal';
import Header from '../../components/Header';
import { NavBar } from '../../components/NavBar';

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePage"
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function HomePage({ navigation }: Props) {

  return (
    <Background>
      <Header />
      
      <NavBar />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 200,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
  },
});

