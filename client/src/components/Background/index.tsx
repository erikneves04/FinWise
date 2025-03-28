import { View, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AFCBFF", 
  },
});
