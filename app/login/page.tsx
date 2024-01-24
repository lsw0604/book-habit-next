import LoginForm from './_components/login-form';

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">로그인</h1>
      <div className="w-full flex justify-center max-w-sm">
        <LoginForm />
      </div>
    </>
  );
}
