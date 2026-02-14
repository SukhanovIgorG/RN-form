import { Button, FormInput, FormSelect, FormSwitch } from "@/components";
import { SPACING } from "@/tokens";
import { normalizePhone } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";

import { Divider } from "../../ui";
import { registerDefaultValues, registerSchema } from "./constants";

export const RegisterForm = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: registerDefaultValues,
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    const hasErrors = !!Object.keys(errors).length;
    if (hasErrors) {
      return;
    } else {
      console.log(data);
      Alert.alert("Успешно", "Форма отправлена");
      reset();
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
              type="email"
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
              onBlur={() => {
                const normalized = normalizePhone(value);
                onChange(normalized);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              placeholder="Телефон"
              type="phone"
              required
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormSelect
              error={errors.gender?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Пол"
              required
              options={[
                { label: "Мужской", value: "male" },
                { label: "Женский", value: "female" },
              ]}
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
