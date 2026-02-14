import { COLORS, SPACING } from "@/tokens";
import { Fragment, useState } from "react";
import {
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
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

  return (
    <View style={[styles.inputContainer, styleContainer]}>
      <Text style={styles.label}>{placeholder + (required ? "*" : "")}</Text>
      <TouchableOpacity
        style={styles.select}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <Typography style={styles.selectContent}>
          {options.find((option) => option.value === value)?.label}
        </Typography>
        <Image
          style={styles.arrow}
          source={require("@/assets/icons/arrow-select.png")}
        />
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
                    <Image
                      style={styles.arrow}
                      source={require("@/assets/icons/radio-checked.png")}
                    />
                  ) : (
                    <Image
                      style={styles.arrow}
                      source={require("@/assets/icons/radio-unchecked.png")}
                    />
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
  arrow: {
    width: 24,
    height: 24,
  },
  modalContent: {
    paddingTop: SPACING.md,
    paddingBottom: 100,
    paddingHorizontal: SPACING.md,
    width: "100%",
    gap: SPACING.sm,
  },
  option: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingVertical: SPACING.lg,
  },
});
