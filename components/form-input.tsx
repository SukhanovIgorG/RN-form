import { COLORS, FONT_SIZES, SPACING } from "@/tokens";
import {
  type BlurEvent,
  type FocusEvent,
  type TextInputProps,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ErrorText, Input } from "./ui";

interface FormInputProps extends TextInputProps {
  error?: string;
  required?: boolean;
}

export const FormInput = ({
  error,
  placeholder,
  onFocus,
  onBlur,
  value,
  required,
  ...rest
}: FormInputProps) => {
  const progress = useSharedValue(!!value ? 1 : 0);

  console.log(rest);

  const handleFocus = (e: FocusEvent) => {
    progress.value = withTiming(1, { duration: 150 });
    onFocus?.(e);
  };
  const handleBlur = (e: BlurEvent) => {
    !value && (progress.value = withTiming(0, { duration: 150 }));
    onBlur?.(e);
  };

  const labelStyle = useAnimatedStyle(() => ({
    top: interpolate(progress.value, [0, 1], [SPACING.lg, 0]),
    fontSize: interpolate(
      progress.value,
      [0, 1],
      [FONT_SIZES.md, FONT_SIZES.xs],
    ),
  }));

  return (
    <View style={styles.inputContainer}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {placeholder + (required ? "*" : "")}
      </Animated.Text>
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        {...rest}
      />
      {error && <ErrorText message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    paddingHorizontal: SPACING.sm,
  },
  label: {
    fontSize: 12,
    color: COLORS.gray,
    position: "absolute",
    left: SPACING.sm,
    zIndex: 1,
  },
  labelActive: {
    top: 0,
  },
  labelInactive: {
    fontSize: 16,
    top: SPACING.lg,
  },
});
