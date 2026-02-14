import { COLORS, SPACING } from "@/tokens";
import { StyleSheet, Switch, SwitchProps, Text, View } from "react-native";

interface FormSwitchProps extends SwitchProps {
  error?: string;
  label?: string;
}

export const FormSwitch = ({ error, label, ...rest }: FormSwitchProps) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.switchContainer}>
        <Text>{label}</Text>
        <Switch
          trackColor={{
            false: COLORS.lightGray,
            true: COLORS.lightBlue,
          }}
          {...rest}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    paddingHorizontal: SPACING.sm,
  },
  switchContainer: {
    paddingHorizontal: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  error: {
    paddingVertical: 0,
    alignSelf: "flex-start",
    fontSize: 12,
    color: COLORS.error,
  },
});
