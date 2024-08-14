import { Todo } from "~/types/todo";

export async function getTodos(userId: number): Promise<Todo[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    return await response.json();
  } catch {
    return [];
  }
}
