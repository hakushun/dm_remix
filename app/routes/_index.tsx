import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
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
      <nav>
        <ul>
          <li>
            <NavLink to="/todos">Todos</NavLink>
          </li>
          <li>
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/alubms">Alubms</NavLink>
          </li>
        </ul>
      </nav>
    </main>
  );
}
