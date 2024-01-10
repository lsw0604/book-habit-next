import { useMemo, useState } from 'react';

interface IProps {
  email: string;
  password: string;
  check_password?: string;
  name?: string;
  mode: 'login' | 'register';
}

const PASSWORD_MIN_LENGTH = 8;

export default function useValidateHook({
  email,
  password,
  check_password,
  mode,
  name,
}: IProps) {
  const [validate, setValidate] = useState();

  const isEmailValid = useMemo(
    () => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
    [email]
  );

  const isPasswordHasNameOrEmail = useMemo(
    () => !password || !name || password.includes(email.split('@')[0]),
    [password, name, email]
  );

  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );

  const validateForm = (): boolean => {
    if (!email || !password) return false;
    if (mode === 'register' && (!name || password !== check_password))
      return false;
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    )
      return false;
    return true;
  };

  return {
    validate: validateForm(),
    isEmailValid,
    isPasswordHasNameOrEmail,
    isPasswordHasNumberOrSymbol,
    isPasswordOverMinLength,
  };
}
