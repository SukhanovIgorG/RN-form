import { COLORS, SPACING } from "@/tokens";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
    register,
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
  const onSubmit = (data: any) => console.log(data);

  console.log("errors", errors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Форма</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="ФИО"
              />
            )}
            name="fio"
          />
          {errors.fio && <Text style={styles.error}>{errors.fio.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="email"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="телефон"
              />
            )}
            name="phone"
          />
          {errors.phone && (
            <Text style={styles.error}>{errors.phone.message}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="пол"
              />
            )}
            name="gender"
          />
          {errors.gender && (
            <Text style={styles.error}>{errors.gender.message}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.switchContainer}>
            <Text>Согласие с условиями</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Switch
                  trackColor={{
                    false: COLORS.lightGray,
                    true: COLORS.lightBlue,
                  }}
                  onValueChange={onChange}
                  value={value}
                />
              )}
              name="agreement"
            />
          </View>
          {errors.agreement && (
            <Text style={styles.error}>{errors.agreement.message}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Отправить</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.lightGray,
    borderRadius: SPACING.xs,
    padding: SPACING.sm,
    marginVertical: SPACING.sm,
    width: "100%",
  },
  error: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 0,
    alignSelf: "flex-start",
    fontSize: 12,
    color: COLORS.error,
  },
  button: {
    backgroundColor: COLORS.brandDefault,
    color: COLORS.white,
    padding: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 56,
    fontSize: 16,
  },
  buttonText: {
    color: COLORS.white,
  },
  switchContainer: {
    paddingHorizontal: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
