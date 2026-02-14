import { COLORS, SPACING } from "@/tokens";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.brandDefault,
    color: COLORS.white,
    padding: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 56,
    fontSize: 16,
  },
  buttonText: {
    color: COLORS.white,
  },
});
