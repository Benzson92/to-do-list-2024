import { TodoItemDTO } from "../../models/todo/todo.dto";

export type TodoCategoryType = "Scheduled" | "General" | "Goal";
export type TodoSubmitType = Omit<
  TodoItemDTO,
  "id" | "completed" | "createdAt"
>;
