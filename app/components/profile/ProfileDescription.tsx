'use client';

import styled from 'styled-components';

import { IconFemale, IconMale, IconPencil } from 'style/icon';
import { customize } from 'style/colors';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { modalActions } from '@/app/store/modal';

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  flex-direction: column;
  gap: 8px;
  svg {
    height: 20px;
    margin-right: 8px;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }

  .name {
    font-size: 20px;
    color: ${({ theme }) => theme.mode.typo_main};
    svg {
      height: 16px;
    }
  }
  .email {
    font-size: 12px;
    color: ${customize.gray['400']};
  }

  .age {
    display: flex;
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    color: ${({ theme }) => theme.mode.typo_main};
  }
`;

const GENDER_OBJECT: Record<'female' | 'male', JSX.Element> = {
  male: <IconMale />,
  female: <IconFemale />,
};

export default function ProfileDescription() {
  const dispatch = useAppDispatch();
  const { name, gender, email, age } = useAppSelector(
    (state: RootState) => state.user
  );

  const modalHandler = () => {
    dispatch(modalActions.setModalType('modifyProfile'));
  };

  return (
    <Container>
      <p className="name">
        {name}&nbsp;
        <IconPencil onClick={modalHandler} />
      </p>
      <p className="email">{email}</p>
      <p className="age">
        {GENDER_OBJECT[gender as 'female' | 'male']}
        {age}살
      </p>
    </Container>
  );
}
