import { Platform, ScrollView, StyleSheet, View } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  children: React.ReactNode;
  height: string;
  width?: string;
  radius?: boolean;
  borderRadius?: number;
}

export function Modal({ children, height, width, radius, borderRadius }: Props) {
  const finalBorderRadius = borderRadius ?? (radius ? 15 : 0);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      zIndex: 6,
      backgroundColor: "white",
      paddingTop: wp(3),
      paddingBottom: wp(4),
      height: hp(height ? parseFloat(height) : 100),
      width: wp(width ? parseFloat(width) : 85),
      borderRadius: finalBorderRadius,
      ...Platform.select({
        ios: {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
        },
        android: {
          elevation: 5,
        },
      }),
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", width: "100%" }}
        showsVerticalScrollIndicator={true}
      >
        {children}
      </ScrollView>
    </View>
  );
}
