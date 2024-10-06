import { useRouter } from 'next/navigation';
import React from 'react';

const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGOUT_URI}`;

export default function HeaderDropdown() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { provider } = useAppSelector((state: RootState) => state.user);

  const setUserInitialState = () => dispatch(userActions.setUserInitialState());
  const setModalState = (type: ModalComponentType) =>
    dispatch(modalActions.setModalState({ type }));

  const modifyModalOpen = () => setModalState('modifyProfile');
  const navigateSearchUrl = () => router.push('/search');
  const navigateMyBookUrl = () => router.push('/my_books?category=전체보기');

  const openWindow = () => window.open(KAKAO_LOGOUT_URL, '_self');

  const handleLogout = async () => {
    if (provider === 'kakao') {
      openWindow();
    }

    const { message, status } = await logoutAPI();

    setUserInitialState();
    window.localStorage.removeItem('ACCESS');
  };

  const DROPDOWN_OPTIONS = [
    {
      label: '나의 서재',
      onClick: navigateMyBookUrl,
    },
    {
      label: '책 검색하기',
      onClick: navigateSearchUrl,
    },
    {
      label: '프로필 수정',
      onClick: modifyModalOpen,
    },
    {
      label: '로그아웃',
      onClick: handleLogout,
    },
  ];

  return (
    <ul className="absolute z-9999 top-16 right-6 flex p-1 mt-3 flex-col w-40 h-auto bg-slate-50 rounded-md shadow-md">
      {DROPDOWN_OPTIONS.map((option) => (
        <li
          key={option.label}
          onClick={option.onClick}
          className="p-2.5 w-full h-auto inline-flex justify-between items-center mb-2.5 last:mb-0"
        >
          <p className="w-full">{option.label}</p>
        </li>
      ))}
    </ul>
  );
}
