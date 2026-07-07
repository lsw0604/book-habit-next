import { LoginProvider } from "./provider";
import { LoginForm as FormContent } from './form';

export function LoginFormWrapper() {
  return (
    <LoginProvider>
      <FormContent />
    </LoginProvider>
  );
}