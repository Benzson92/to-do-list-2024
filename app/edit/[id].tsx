import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import isEmpty from "lodash/isEmpty";

import RouteHeader from "@/components/headers/RouteHeader";
import TodoTaskForm from "@/components/TodoTaskForm";

import { useTodos } from "@/hooks/useTodos.hook";

import { FormErrors } from "@/models/todo/todo.interface";
import { TodoItemDTO } from "../../models/todo/todo.dto";

import { TodoSubmitType } from "@/types/todo/todo.type";
import { initialFormValues } from "@/constants/form.constant";

const EditTaskPage: React.FC = () => {
  const navigation = useNavigation();
  const { id = "" } = useLocalSearchParams<{ id: string }>();

  const { getTodoById, updateTodo } = useTodos();
  const task = getTodoById(id);

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isEmpty(task)) {
      setFormValues({
        title: task.title,
        category: task.category,
        date: task.date ? new Date(task.date) : undefined,
        time: task.time ? new Date(task.time) : undefined,
        notes: task.notes,
      });
    }
  }, [task]);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSubmit = (data: TodoSubmitType) => {
    const updatedTask: TodoItemDTO = {
      ...task,
      ...data,
      id,
      completed: task?.completed || false,
      createdAt: task?.createdAt || new Date().toISOString(),
    };

    updateTodo(updatedTask);

    handleClose();
  };

  return (
    <View style={styles.container}>
      <RouteHeader onClose={handleClose} title="Edit Task" />
      <TodoTaskForm
        formValues={formValues}
        formErrors={formErrors}
        setFormValues={setFormValues}
        setFormErrors={setFormErrors}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditTaskPage;
