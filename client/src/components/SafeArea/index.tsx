import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaProps {
  children: React.ReactNode;
}

export function SafeArea({ children }: SafeAreaProps) {
  return <SafeAreaView style={styles.SafeArea}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor:'#000',
  },
});
