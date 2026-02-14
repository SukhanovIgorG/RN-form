import { COLORS, FONT_SIZES, SPACING } from "@/tokens";
import { Fragment, useEffect, useState } from "react";
import {
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
  Keyboard,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IconArrow, IconChecked, IconUnchecked } from "./icons";
import { Divider, ErrorText, Modal, Typography } from "./ui";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps extends TextInputProps {
  error?: string;
  required?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  options: Option[];
}

export const FormSelect = ({
  error,
  placeholder,
  onFocus,
  onBlur,
  value,
  required,
  styleContainer,
  inputStyle,
  options,
  ...rest
}: FormSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const progress = useSharedValue(!!value || isOpen ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(!!value || isOpen ? 1 : 0, { duration: 150 });
  }, [value, isOpen]);

  const labelStyle = useAnimatedStyle(() => ({
    top: interpolate(progress.value, [0, 1], [SPACING.lg, 0]),
    fontSize: interpolate(
      progress.value,
      [0, 1],
      [FONT_SIZES.md, FONT_SIZES.xs],
    ),
  }));

  return (
    <View style={[styles.inputContainer, styleContainer]}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {placeholder + (required ? "*" : "")}
      </Animated.Text>
      <TouchableOpacity
        style={styles.select}
        onPress={() => {
          Keyboard.dismiss();
          setIsOpen((prev) => !prev);
        }}
      >
        <Typography style={styles.selectContent}>
          {options.find((option) => option.value === value)?.label}
        </Typography>
        <IconArrow style={styles.icon} />
      </TouchableOpacity>
      <Modal isOpen={isOpen}>
        <View style={styles.modalContent}>
          {options.map((option) => (
            <Fragment key={option.value}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  rest.onChangeText?.(option.value);
                  setIsOpen(false);
                }}
              >
                <Typography>{option.label}</Typography>
                <Typography>
                  {option.value === value ? (
                    <IconChecked style={styles.icon} />
                  ) : (
                    <IconUnchecked style={styles.icon} />
                  )}
                </Typography>
              </TouchableOpacity>
              {option.value !== options[options.length - 1].value && (
                <Divider />
              )}
            </Fragment>
          ))}
        </View>
      </Modal>
      {error && <ErrorText message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  label: {
    fontSize: 12,
    color: COLORS.gray,
    position: "absolute",
    zIndex: 1,
  },
  labelActive: {
    top: 0,
  },
  labelInactive: {
    fontSize: 16,
    top: SPACING.lg,
  },
  select: {
    paddingTop: SPACING.md,
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  selectContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  modalContent: {
    paddingTop: SPACING.md,
    paddingBottom: 100,
    paddingHorizontal: SPACING.md,
    width: "100%",
  },
  option: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingVertical: SPACING.lg,
  },
});
