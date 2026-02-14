import { COLORS } from "@/tokens";
import { View, ViewStyle } from "react-native";

interface Divider {
  color?: string;
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
}

export const Divider = ({
  color = COLORS.lightGray,
  width = "100%",
}: Divider) => (
  <View
    style={{
      height: 0,
      width: width,
      borderBottomColor: color,
      borderBottomWidth: 1,
    }}
  />
);
