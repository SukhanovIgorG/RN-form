import { COLORS, SPACING } from "@/tokens";
import { useState } from "react";
import {
  BlurEvent,
  FocusEvent,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

interface FormInputProps extends TextInputProps {
  error?: string;
}

export const FormInput = ({
  error,
  placeholder,
  onFocus,
  onBlur,
  value,
  ...rest
}: FormInputProps) => {
  const [showLabel, setShowLabel] = useState(false);

  const handleFocus = (e: FocusEvent) => {
    setShowLabel(true);
    onFocus?.(e);
  };

  const handleBlur = (e: BlurEvent) => {
    !value && setShowLabel(false);
    onBlur?.(e);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={showLabel ? styles.labelActive : styles.labelInactive}>
        {placeholder}
      </Text>
      <TextInput
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    paddingHorizontal: SPACING.sm,
  },
  labelActive: {
    position: "absolute",
    top: 0,
    left: SPACING.sm,
    fontSize: 12,
    color: COLORS.gray,
    zIndex: 1,
  },
  labelInactive: {
    fontSize: 16,
    color: COLORS.gray,
    position: "absolute",
    top: SPACING.lg,
    left: SPACING.sm,
    zIndex: 1,
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.lightGray,
    borderRadius: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    height: 56,
    width: "100%",
  },
  error: {
    paddingVertical: 0,
    alignSelf: "flex-start",
    fontSize: 12,
    color: COLORS.error,
  },
});
