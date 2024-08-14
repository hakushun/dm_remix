import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getAuthFromRequest } from "~/auth";
import { getAlbum, getPhotos } from "./queries";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await getAuthFromRequest(request);

  if (!user) throw redirect("/login");

  invariant(params.id, "Missing album ID");
  const id = Number(params.id);

  const album = await getAlbum(id);

  if (!album) throw redirect("/albums");

  const photos = await getPhotos(album.id);
  return json({ album, photos });
}

export default function Photos() {
  const { album, photos } = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>
        <em>{album.title}</em>&apos;s Photos
      </h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <figure>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <figcaption>{photo.title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </main>
  );
}
