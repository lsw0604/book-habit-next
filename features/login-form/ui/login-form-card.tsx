'use client';

import { LoginForm } from './login-form';
import { LoginProvider } from './login-provider';

export function LoginFormCard() {
  return (
    <LoginProvider>
      <LoginForm />
    </LoginProvider>
  );
}
