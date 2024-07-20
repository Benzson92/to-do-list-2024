import { FormValues, FormErrors } from "@/models/todo/todo.interface";

export const initialFormValues: FormValues = {
  title: "",
  category: undefined,
  date: undefined,
  time: undefined,
  notes: "",
};

export const REQUIRED_FIELDS: Array<keyof FormErrors> = [
  "title",
  "category",
  "date",
  "time",
];
