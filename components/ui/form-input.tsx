import { COLORS, FONT_SIZES, SPACING } from "@/tokens";
import {
  BlurEvent,
  FocusEvent,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  const progress = useSharedValue(!!value ? 1 : 0);

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
        {placeholder}
      </Animated.Text>
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
  error: {
    paddingVertical: 0,
    alignSelf: "flex-start",
    fontSize: 12,
    color: COLORS.error,
  },
});
