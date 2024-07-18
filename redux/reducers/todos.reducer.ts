import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { parseISO, isToday } from "date-fns";

import { RootState } from "../store";

import { TodoItemDTO, TodosStateDTO } from "@/models/todo/todo.dto";
import { TodoCategoryType } from "@/types/todo/todo.type";

const initialState: TodosStateDTO = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItemDTO>) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action: PayloadAction<TodoItemDTO>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, editTodo, deleteTodo, toggleTodo } = todosSlice.actions;

// Selectors
export const selectTodosState = (state: RootState) => state.todoReducer;

export const selectTodos = createSelector(
  [selectTodosState],
  (todosState) => todosState.todos
);

export const selectTodoById = (todoId: string) =>
  createSelector([selectTodos], (todos) =>
    todos.find((todo) => todo.id === todoId)
  );

export const selectTodosByCategory = (category: TodoCategoryType) =>
  createSelector([selectTodos], (todos) =>
    todos.filter((todo) => todo.category === category)
  );

export const selectCompletedTodos = createSelector([selectTodos], (todos) =>
  todos.filter((todo) => todo.completed)
);

export const selectIncompleteTodos = createSelector([selectTodos], (todos) =>
  todos.filter((todo) => !todo.completed)
);

export const selectTodayIncompleteTodos = createSelector(
  [selectIncompleteTodos],
  (incompleteTodos) =>
    incompleteTodos.filter((todo) => isToday(parseISO(todo.date)))
);

export default todosSlice.reducer;
