import AuthForm from "../components/auth-form";
import React from "react";

export default async function Home({searchParams}) {
  const formMode = searchParams.mode || 'login';
  return <AuthForm mode={formMode} />;
}
