"use client";

import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { signup } from "../actions/auth_actions";

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export default function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await signup({ formData });

      if (response?.errors) {  // Check if response and errors exist
        setErrors(response.errors);
      } else {
        // Handle successful signup (e.g., redirect or show success message)
      }
    } catch (error) {
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <form id="auth-form" onSubmit={handleSubmit}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>{errors.password}</span>}
      </p>
      {errors.form && (
        <ul id="form-errors">
          <li>{errors.form}</li>
        </ul>
      )}
      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
