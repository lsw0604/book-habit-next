import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import Button from 'components/common/button';
import KakaoButton from 'components/common/button/KakaoButton';
import Divider from 'components/common/Divider';
import ModalLogoBody from 'components/modal/ModalLogoBody';

import ModalHeader from 'components/modal/ModalHeader';
import { IconPerson, LogoMain } from 'style/icon';
import { useAppDispatch } from '@/app/store';
import { modalActions } from '@/app/store/modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
`;

export default function LoginMessageModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const modalClose = () => dispatch(modalActions.setModalClose());

  const loginPageHandler = () => {
    router.push('/login');
    modalClose();
  };

  return (
    <Container>
      <ModalHeader
        title="책벌래는 로그인이 필요해요"
        icon={<IconPerson />}
        sub="로그인하시면 더 많은 서비스를 누릴 수 있습니다."
      />
      <ModalLogoBody
        icon={<LogoMain />}
        highlight="로그인"
        message=" 하실래요?"
      />
      <Divider divider={10} />
      <Footer>
        <Stack>
          <Button onClick={loginPageHandler} type="button">
            로그인하러가기
          </Button>
        </Stack>
        <Stack>
          <KakaoButton />
        </Stack>
      </Footer>
    </Container>
  );
}
