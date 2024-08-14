import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuthFromRequest } from "~/auth";
import { getAlbums } from "./queries";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getAuthFromRequest(request);

  if (!user) throw redirect("/login");

  const albums = await getAlbums(user.id);
  return json({ albums });
}

export default function Albums() {
  const { albums } = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Your Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </main>
  );
}
