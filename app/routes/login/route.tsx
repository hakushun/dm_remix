import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { validate } from "./validate";
import { login } from "./queries";
import { redirectIfLoggedInLoader, setAuthOnResponse } from "~/auth";

export const meta = () => {
  return [{ title: "Login Page" }];
};

export function loader(args: LoaderFunctionArgs) {
  return redirectIfLoggedInLoader(args);
}

export async function action({ request }: ActionFunctionArgs) {
  const formdata = await request.formData();
  const email = String(formdata.get("email") || "");
  const password = String(formdata.get("password") || "");
  const errors = await validate({ email, password });

  if (errors) return json({ errors }, 400);

  const user = await login({ email, password });

  if (!user)
    return json(
      {
        errors: {
          email: "Invalid email or password.",
          password: "Invalid email or password.",
        },
      },
      400
    );

  const response = redirect("/");
  return setAuthOnResponse(response, user);
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <fieldset>
        <legend>
          <h2>Login to Your Account</h2>
        </legend>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" required />
          {actionData?.errors?.email && <span>{actionData.errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
          {actionData?.errors?.password && <span>{actionData.errors.password}</span>}
        </div>
      </fieldset>
      <button type="submit">Log In</button>
    </Form>
  );
}
