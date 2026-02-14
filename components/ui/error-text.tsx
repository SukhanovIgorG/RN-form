import { COLORS } from "@/tokens";
import { StyleSheet, Text } from "react-native";

export const ErrorText = ({ message }: { message?: string }) => {
  return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
  error: {
    paddingVertical: 0,
    alignSelf: "flex-start",
    fontSize: 12,
    color: COLORS.error,
  },
});
