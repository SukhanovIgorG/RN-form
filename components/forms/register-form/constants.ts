import { normalizePhone } from "@/utils";
import * as z from "zod";

export const registerSchema = z.object({
  fio: z
    .string()
    .min(3, "ФИО должно быть не менее 3 символов")
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Только буквы/пробел/дефис"),
  email: z.string().email("Неверный email"),
  phone: z
    .string()
    .transform(normalizePhone)
    .pipe(
      z
        .string()
        .regex(/^\+7\d{10}$/, "Телефон должен быть в формате +7XXXXXXXXXX"),
    ),
  gender: z.string(),
  agreement: z
    .boolean()
    .refine((value) => value === true, "Согласие с условиями обязательно"),
});

export const registerDefaultValues = {
  fio: "",
  email: "",
  phone: "",
  gender: "",
  agreement: false,
};

export const genderOptions = [
  { label: "Мужской", value: "male" },
  { label: "Женский", value: "female" },
];
