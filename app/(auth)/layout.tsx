import React from "react";
import "../globals.css";
import { logout } from "../../actions/auth_actions";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthRootLayout({ children }) {
  return (
    <>
      <header id="auth-header">
        <p>Welcome Back!!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
