'use client';

import { RegisterForm } from './register-from';
import { RegisterProvider } from './register-provider';

export function RegisterFormCard() {
  return (
    <RegisterProvider>
      <RegisterForm />
    </RegisterProvider>
  );
}
