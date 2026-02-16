import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Name is required").min(3, "En az 3 karakter"),
  email: yup
    .string()
    .email("Invalid email address")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Email geçersiz")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "En az 7 karakter")
    .required("Enter a valid Password*")
    .matches(/[A-Z]/, "En az 1 büyük harf olmalı")
    .matches(/[0-9]/, "En az 1 rakam olmalı")
    .matches(/[^A-Za-z0-9]/, "En az 1 özel karakter olmalı"),
});
