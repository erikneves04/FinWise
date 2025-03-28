import { useFonts } from "expo-font";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";  

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    "Quicksand-Light": Quicksand_300Light,
    "Quicksand-Regular": Quicksand_400Regular,
    "Quicksand-Medium": Quicksand_500Medium,
    "Quicksand-SemiBold": Quicksand_600SemiBold,
    "Quicksand-Bold": Quicksand_700Bold,
  });

  return fontsLoaded;
};
