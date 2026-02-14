import { Button, FormInput, FormSwitch } from "@/components";
import { SPACING } from "@/tokens";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import * as z from "zod";
import { Divider } from "../ui";

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

export const RegisterForm = () => {
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
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    if (errors) {
      return;
    } else {
      console.log(data);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.formContainer}>
        <Divider />
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
              required
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
              required
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
              required
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
              required
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    gap: SPACING.sm,
    alignItems: "center",
    padding: SPACING.md,
  },
});
