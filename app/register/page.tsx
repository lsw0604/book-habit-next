'use client';

import RegisterForm from './_components/register-form';

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">회원가입</h1>
      <div className="w-full flex justify-center">
        <RegisterForm />
      </div>
    </>
  );
}
