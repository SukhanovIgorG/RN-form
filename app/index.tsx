import { Button, FormInput, FormSwitch } from "@/components";
import { FONT_SIZES, SPACING } from "@/tokens";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

const schema = z.object({
  fio: z
    .string()
    .min(3, "ФИО должно быть не менее 3 символов")
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Только буквы/пробел/дефис"),
  email: z.string().email("Неверный email"),
  phone: z
    .string()
    .regex(/^\+7\d{10}$/, "Телефон должен быть в формате +7XXXXXXXXXX"),
  gender: z.string(),
  agreement: z
    .boolean()
    .refine((value) => value === true, "Согласие с условиями обязательно"),
});

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fio: "",
      email: "",
      phone: "",
      gender: "мужской",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (errors) {
      return;
    } else {
      console.log(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Форма</Text>

        <Controller
          name="fio"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              error={errors.fio?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="ФИО"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              error={errors.email?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="email"
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              error={errors.phone?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="телефон"
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              error={errors.gender?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="пол"
            />
          )}
        />

        <Controller
          name="agreement"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormSwitch
              label="Согласие с условиями"
              onValueChange={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.agreement?.message}
            />
          )}
        />
      </View>

      <Button title="Сохранить" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: "space-between",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    gap: SPACING.sm,
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
  },
});
