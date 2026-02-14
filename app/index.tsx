import { RegisterForm } from "@/components";
import { Typography, TypographyVariant } from "@/components/ui";
import { FONT_SIZES, SPACING } from "@/tokens";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <Typography style={styles.title} variant={TypographyVariant.h1}>
        Форма
      </Typography>
      <RegisterForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "flex-start",
    height: "100%",
    gap: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
});
