import { type Album } from "~/types/album";

export async function getAlbums(userId: number): Promise<Album[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    return await response.json();
  } catch {
    return [];
  }
}
