import { COLORS, SPACING } from "@/tokens";
import { StyleSheet, SwitchProps, Text, View } from "react-native";
import { ErrorText, Switch } from "./ui";

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
      {error && <ErrorText message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    paddingHorizontal: SPACING.sm,
  },
  switchContainer: {
    paddingVertical: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
