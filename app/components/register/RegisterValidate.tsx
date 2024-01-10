import styled from 'styled-components';

import ValidationMessage from 'components/common/message/ValidationMessage';

interface IProps {
  isPasswordHasNameOrEmail: boolean;
  isPasswordOverMinLength: boolean;
  isPasswordHasNumberOrSymbol: boolean;
  password: string;
  checkedPassword: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

export default function RegisterValidate({
  isPasswordHasNameOrEmail,
  checkedPassword,
  isPasswordHasNumberOrSymbol,
  isPasswordOverMinLength,
  password,
}: IProps) {
  return (
    <Container>
      <ValidationMessage
        errorMessage="비밀번호에 이름 이메일을 포함할 수 없습니다."
        isValid={isPasswordHasNameOrEmail}
      />
      <ValidationMessage
        errorMessage="최소 8자리의 비밀번호를 설정하세요."
        isValid={!isPasswordOverMinLength}
      />
      <ValidationMessage
        errorMessage="숫자나 기호를 포함하세요."
        isValid={isPasswordHasNumberOrSymbol}
      />
      <ValidationMessage
        errorMessage="비밀번호와 비밀번호 확인은 같아야합니다."
        isValid={password !== checkedPassword}
      />
    </Container>
  );
}
