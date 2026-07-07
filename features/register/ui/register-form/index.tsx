import { RegisterForm as FormContent } from './form';
import { RegisterProvider } from './provider';

export function RegisterFormWrapper() {
  return (
    <RegisterProvider>
      <FormContent />
    </RegisterProvider>
  );
}
