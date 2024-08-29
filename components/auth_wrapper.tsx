// app/components/AuthWrapper.tsx
import { redirect } from "next/navigation";
import { verifyAuth } from "../lib/auth";
import AuthForm from "./auth-form";

export default async function AuthWrapper() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  return <AuthForm mode={"login"} />;
}
