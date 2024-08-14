import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";

export const meta: MetaFunction = () => {
  return [{ title: "Remix Demo App" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuthCookie(request);
  return null;
}

export default function Index() {
  return (
    <main>
      <h2>Welcome to Remix Demo</h2>
      <ul>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/alubms">Alubms</Link>
        </li>
      </ul>
    </main>
  );
}
