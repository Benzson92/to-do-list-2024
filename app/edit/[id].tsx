import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

// Components
import TodoTaskForm from "@/components/TodoTaskForm";

// Hooks
import { useTodos } from "@/hooks/useTodos.hook";

// Types and Models
import { TodoItemDTO } from "@/models/todo/todo.dto";
import { FormValues, FormErrors } from "@/models/todo/todo.interface";
import { TodoSubmitType } from "@/types/todo/todo.type";

const EditTaskPage: React.FC = () => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const { id } = route.params as { id: string };
  const { id = "" } = useLocalSearchParams<{ id: string }>();

  console.log("EditTaskPage id", id);

  const { getTodoById, updateTodo } = useTodos();
  const task = getTodoById(id);

  const initialFormValues: FormValues = {
    title: task?.title || "",
    category: task?.category || undefined,
    date: task?.date ? new Date(task.date) : undefined,
    time: task?.time ? new Date(task.time) : undefined,
    notes: task?.notes || "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (task) {
      setFormValues({
        title: task.title || "",
        category: task.category || undefined,
        date: task.date ? new Date(task.date) : undefined,
        time: task.time ? new Date(task.time) : undefined,
        notes: task.notes || "",
      });
    }
  }, [task]);

  const handleSubmit = (data: TodoSubmitType) => {
    if (task) {
      updateTodo({
        ...task,
        ...data,
      });
      navigation.goBack();
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <TodoTaskForm
      formValues={formValues}
      formErrors={formErrors}
      setFormValues={setFormValues}
      setFormErrors={setFormErrors}
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
};

export default EditTaskPage;
