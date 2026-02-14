import { COLORS, FONT_SIZES } from "@/tokens";
import { StyleSheet, Text, TextProps } from "react-native";

export enum TypographyVariant {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  body = "body",
  caption = "caption",
  button = "button",
}

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
}
export const Typography = ({
  children,
  variant = TypographyVariant.body,
  color = COLORS.text,
  style,
  ...props
}: TypographyProps) => {
  return (
    <Text style={[styles[variant], { color }, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
  },
  h2: {
    fontSize: FONT_SIZES.md,
    fontWeight: "bold",
  },
  h3: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "bold",
  },
  body: {
    fontSize: FONT_SIZES.md,
  },
  caption: {
    fontSize: FONT_SIZES.xs,
  },
  button: {
    fontSize: FONT_SIZES.md,
    fontWeight: "bold",
  },
});
