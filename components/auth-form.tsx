'use client';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { auth } from '../actions/auth_actions';

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [formState, setFormState] = useState<{ errors?: FormErrors }>({});
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await auth(mode, formState, formData);

    if (response?.errors) {
      setFormState({ errors: response.errors });
    } else {
      // Handle success (e.g., navigate to a different page or show a success message)
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
           autoComplete="username"
        />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
      <p>
        {mode === 'login' ? (
          <Link href="/?mode=signup">Create an account.</Link>
        ) : (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
