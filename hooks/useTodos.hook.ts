import { useAppDispatch, useAppSelector } from "./redux.hook";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  selectTodos,
  selectTodoById,
  selectTodosByCategory,
  selectCompletedTodos,
  selectTodayIncompleteTodos,
} from "../redux/reducers/todos.reducer";

import { TodoItemDTO } from "../models/todo/todo.dto";
import { TodoCategoryType, TodoSubmitType } from "@/types/todo/todo.type";

export const useTodos = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const completedTodos = useAppSelector(selectCompletedTodos);
  const todayIncompleteTodos = useAppSelector(selectTodayIncompleteTodos);

  console.log("useTodos todos", todos);

  const getTodoById = (id: string) =>
    useAppSelector((state) => selectTodoById(id)(state));
  const getTodosByCategory = (category: TodoCategoryType) =>
    useAppSelector((state) => selectTodosByCategory(category)(state));

  const addNewTodo = (data: TodoSubmitType) => {
    const newTodo: TodoItemDTO = {
      ...data,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch(addTodo(newTodo));
  };

  const toggleTodoStatus = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const updateTodo = (data: TodoItemDTO) => {
    dispatch(editTodo(data));
  };

  return {
    todos,
    completedTodos,
    todayIncompleteTodos,
    getTodoById,
    getTodosByCategory,
    addNewTodo,
    toggleTodoStatus,
    removeTodo,
    updateTodo,
  };
};
