import KakaoRegisterForm from './_components/kakao-register-form';

export default function KakaoRegisterPage() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">추가정보 등록</h1>
      <div className="w-full flex justify-center max-w-sm">
        <KakaoRegisterForm />
      </div>
    </>
  );
}
