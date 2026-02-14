import { COLORS, SPACING } from "@/tokens";
import { StyleSheet, SwitchProps, View } from "react-native";
import { ErrorText, Switch, Typography } from "./ui";

interface FormSwitchProps extends SwitchProps {
  error?: string;
  label?: string;
}

export const FormSwitch = ({ error, label, ...rest }: FormSwitchProps) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.switchContainer}>
        <Typography>{label}</Typography>
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
  },
  switchContainer: {
    paddingVertical: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
