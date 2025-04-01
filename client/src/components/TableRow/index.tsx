import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaProps {
  children: React.ReactNode;
}

export function TableRow({ children }: SafeAreaProps) {
  return <TableRow>{children}</TableRow>
}
