import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

import RouteHeader from "@/components/headers/RouteHeader";
import TodoTaskForm from "@/components/TodoTaskForm";

import { useTodos } from "@/hooks/useTodos.hook";

import { FormValues, FormErrors } from "@/models/todo/todo.interface";
import { TodoSubmitType } from "@/types/todo/todo.type";
import { initialFormValues } from "@/constants/form.constant";

// const initialFormValues: FormValues = {
//   title: "",
//   category: undefined,
//   date: undefined,
//   time: undefined,
//   notes: undefined,
// };

const AddTaskPage = () => {
  const navigation = useNavigation();
  const { addNewTodo } = useTodos();

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSubmit = (data: TodoSubmitType) => {
    addNewTodo(data);
    handleClose();
  };

  return (
    <View style={styles.container}>
      <RouteHeader onClose={handleClose} title="Add New Task" />
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

export default AddTaskPage;
