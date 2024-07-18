// constants/form.constant.ts

import { FormErrors } from "../models/todo/todo.interface"; // Ensure to import FormErrors from the correct path

export const REQUIRED_FIELDS: Array<keyof FormErrors> = [
  "title",
  "category",
  "date",
  "time",
];
