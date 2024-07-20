import { TodoCategoryType, TodoSubmitType } from "@/types/todo/todo.type";

export interface FormValues {
  title: string;
  category?: TodoCategoryType;
  date?: Date;
  time?: Date;
  notes: string;
}

export interface FormErrors {
  title?: string;
  category?: string;
  date?: string;
  time?: string;
}

export interface TodoTaskFormProps {
  formValues: FormValues;
  formErrors: FormErrors;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  onSubmit: (data: TodoSubmitType) => void;
}
