import { type Album } from "~/types/album";
import { type Photo } from "~/types/photo";

export async function getPhotos(albumId: number): Promise<Photo[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    return await response.json();
  } catch {
    return [];
  }
}

export async function getAlbum(id: number): Promise<Album | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
    return await response.json();
  } catch {
    return null;
  }
}
