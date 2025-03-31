import { ImageBackground, StyleSheet} from "react-native";
interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  }
});
