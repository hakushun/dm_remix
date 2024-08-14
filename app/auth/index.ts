import { type LoaderFunctionArgs, createCookie, redirect } from "@remix-run/node";
import { type User } from "~/types/user";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
  console.warn("🚨 No COOKIE_SECRET environment variable set, using a hardcoded secret. This is not recommended for production.");
  secret = "hardcoded-secret-for-development-only-do-not-use-in-production";
}

const cookie = createCookie("auth", {
  secrets: [secret],
  maxAge: 30 * 24 * 60 * 60, // 30 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

export async function getAuthFromRequest(request: Request): Promise<User | null> {
  const user = await cookie.parse(request.headers.get("Cookie"));
  return user ?? null;
}

export async function setAuthOnResponse(response: Response, user: User): Promise<Response> {
  const header = await cookie.serialize(user);
  response.headers.append("Set-Cookie", header);
  return response;
}

export async function requireAuthCookie(request: Request) {
  const user = await getAuthFromRequest(request);

  if (!user) {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": await cookie.serialize("", {
          maxAge: 0,
        }),
      },
    });
  }

  return user;
}

export async function redirectIfLoggedInLoader({ request }: LoaderFunctionArgs) {
  const user = await getAuthFromRequest(request);

  if (user) throw redirect("/");

  return null;
}

export async function redirectWithClearedCookie(): Promise<Response> {
  return redirect("/", {
    headers: {
      "Set-Cookie": await cookie.serialize(null, {
        expires: new Date(0),
      }),
    },
  });
}
