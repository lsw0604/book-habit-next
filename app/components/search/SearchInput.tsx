'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

import Input from 'components/common/input';
import Icon from 'components/common/button/IconButton';
import { IconSearch } from 'style/icon';

const Container = styled.form`
  width: 100%;
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  position: relative;

  .circle_btn {
    &::placeholder {
      line-height: 16px;
      font-size: 14px;
      font-weight: 700;
      color: ${({ theme }) => theme.mode.typo_sub};
    }
  }
`;

const IconWrapper = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
  top: 5px;
  right: 55px;
`;

export default function SearchInput() {
  const router = useRouter();

  const [keyword, setKeyword] = useState<string>('');

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    router.push(`?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <Container onSubmit={onSubmit}>
      <Input
        className="circle_btn"
        style={{ borderRadius: '2rem', padding: '0 1rem' }}
        value={keyword}
        onChange={onChange}
        placeholder="찾고자하는 책 제목을 입력해주세요."
      />
      <IconWrapper>
        <Icon type="submit" icon={<IconSearch />}>
          Search
        </Icon>
      </IconWrapper>
    </Container>
  );
}
