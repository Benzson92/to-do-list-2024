// src/pages/AddTaskPage.tsx
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Components
import TodoTaskForm from "../components/TodoTaskForm";

import { useTodos } from "../hooks/useTodos.hook";

// Models
import { FormValues, FormErrors } from "../models/todo/todo.interface";
import { TodoItemDTO } from "../models/todo/todo.dto";

// Types
import { TodoSubmitType } from "@/types/todo/todo.type";

const AddTaskPage = () => {
  const navigation = useNavigation();
  const { addNewTodo } = useTodos();

  const initialFormValues: FormValues = {
    title: "",
    category: undefined,
    date: undefined,
    time: undefined,
    notes: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleSubmit = (data: TodoSubmitType) => {
    addNewTodo(data);

    // Handle the form submission
    console.log("AddTaskPage handleSubmit data", data);
    // Navigate back or to another screen after submission
    navigation.goBack();
  };

  return (
    <TodoTaskForm
      formValues={formValues}
      formErrors={formErrors}
      setFormValues={setFormValues}
      setFormErrors={setFormErrors}
      onSubmit={handleSubmit}
      onClose={() => navigation.goBack()}
    />
  );
};

export default AddTaskPage;
