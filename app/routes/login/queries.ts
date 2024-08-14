import { type User } from "~/types/user";

const PASSWORD = "!Passw0rd";

export async function login({ email, password }: { email: string; password: string }) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await response.json()) as User[];
  const user = users.find((user) => user.email === email);

  if (!user) return null;

  if (password !== PASSWORD) return null;

  return user;
}
