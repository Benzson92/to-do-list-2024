import { TodoCategoryType } from "@/types/todo/todo.type";

export interface TodoItemDTO {
  id: string;
  title: string;
  completed: boolean;
  category: TodoCategoryType;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

export interface TodosStateDTO {
  todos: TodoItemDTO[];
}
