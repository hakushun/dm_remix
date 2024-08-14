import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAuthFromRequest } from "~/auth";
import { getTodos } from "./queries";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getAuthFromRequest(request);

  if (!user) throw redirect("/login");

  const todos = await getTodos(user.id);

  return json({ todos });
}

export default function Todos() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Your Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" name="completed" defaultChecked={todo.completed} />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
