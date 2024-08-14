import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuthFromRequest } from "~/auth";
import { getPosts } from "./queries";
import { useLoaderData } from "@remix-run/react";
import { Comments } from "~/components/Comments";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getAuthFromRequest(request);

  if (!user) throw redirect("/login");

  const posts = await getPosts(user.id);
  return json({ posts });
}

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Your Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {/* TODO: 開いたときに取得しに行きたい */}
            <details>
              <summary>Comments</summary>
              <Comments postId={post.id} />
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
}
