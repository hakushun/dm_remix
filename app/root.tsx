import { Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from "@remix-run/react";
import "./tailwind.css";
import { getAuthFromRequest } from "./auth";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getAuthFromRequest(request);
  return { user };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData<typeof loader>();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <h1>Remix Demo</h1>
          {user && (
            <div>
              {currentPath !== "/" && (
                <nav>
                  <ul>
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
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
              )}
              <form method="post" action="/logout">
                <button type="submit">Logout</button>
              </form>
            </div>
          )}
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
