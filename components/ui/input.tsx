import { COLORS, SPACING } from "@/tokens";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export const Input = ({ ...props }: TextInputProps) => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.lightGray,
    borderRadius: SPACING.xs,
    paddingVertical: SPACING.sm,
    height: 56,
    width: "100%",
  },
});
