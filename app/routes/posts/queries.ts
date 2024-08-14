import { type Post } from "~/types/post";

export async function getPosts(userId: number): Promise<Post[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();
    return posts;
  } catch {
    return [];
  }
}
