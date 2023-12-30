import { useState, FormEvent } from 'react';
import styled from 'styled-components';

import Button from 'components/common/button';
import SearchBookRegisterRead from 'components/searchBookRegister/SearchBookRegisterRead';
import SearchBookRegisterReading from 'components/searchBookRegister/SearchBookRegisterReading';
import SearchBookRegisterReadTo from 'components/searchBookRegister/SearchBookRegisterReadTo';
import SearchBookRegisterSkeleton from 'components/searchBookRegister/SearchBookRegisterSkeleton';
import RadioButton from 'components/common/radio/RadioButton';

import useReadingBookMutation from 'queries/book/useReadingBookMutation';
import useReadBookMutation from 'queries/book/useReadBookMutation';
import useReadToBookMutation from 'queries/book/useReadToBookMutation';

import useToastHook from '@/hooks/useToastHook';
import { IconBook, IconBookMark, IconHeart } from 'style/icon';
import { RadioGroupOptionType } from 'types/style';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { bookRegisterActions } from '@/app/store/bookRegister';

interface IRenderRegisterComponent {
  [key: string]: React.ReactNode;
}

const Container = styled.form`
  position: relative;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const options: RadioGroupOptionType<string>[] = [
  {
    label: '읽은 책',
    value: '다읽음',
    icon: <IconBook />,
    description: '다 읽은 책이에요.',
  },
  {
    label: '읽고 있는 책',
    value: '읽는중',
    icon: <IconBookMark />,
    description: '열심히 읽고 있어요.',
  },
  {
    label: '읽고 싶은 책',
    value: '읽고싶음',
    icon: <IconHeart />,
    description: '아직 읽지는 않았어요.',
  },
];

const registerComponent: IRenderRegisterComponent = {
  다읽음: <SearchBookRegisterRead />,
  읽고싶음: <SearchBookRegisterReadTo />,
  읽는중: <SearchBookRegisterReading />,
};

const renderRegisterComponent = (ctx?: ModalType) => {
  if (ctx === undefined || !registerComponent[ctx]) {
    return <SearchBookRegisterSkeleton />;
  }
  return registerComponent[ctx];
};

export default function SearchBookRegister() {
  const [modalState, setModalState] = useState<ModalType>('');

  const dispatch = useAppDispatch();
  const {
    authors,
    contents,
    thumbnail,
    isbn,
    price,
    publisher,
    url,
    title,
    status,
  } = useAppSelector((state: RootState) => state.searchBookRegister);
  const { isLogged } = useAppSelector((state: RootState) => state.user);
  const { endDate, startDate } = useAppSelector(
    (state: RootState) => state.bookRegister
  );

  const { addToast } = useToastHook();

  const { mutate: readingMutate, isLoading: readingLoading } =
    useReadingBookMutation();
  const { mutate: readMutate, isLoading: readLoading } = useReadBookMutation();
  const { mutate: readToMutate, isLoading: readToLoading } =
    useReadToBookMutation();

  const onChangeModal = (value: string) => {
    setModalState(value as ModalType);
  };

  const registerBody: BookRegisterType = {
    authors: authors.join(','),
    publisher,
    thumbnail,
    isbn,
    price,
    status,
    title,
    contents,
    url,
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (modalState === '') {
      return addToast({
        message: '등록할 유형을 선택해주세요.',
        status: 'info',
      });
    }

    if (!isLogged) {
      return addToast({ message: '로그인 해주세요.', status: 'info' });
    }

    dispatch(bookRegisterActions.setBookRegisterUseValidate(true));

    if (modalState === '다읽음' && startDate && endDate) {
      const body: ReadBookRegisterType = {
        ...registerBody,
        startDate: startDate as Date,
        endDate: endDate as Date,
      };
      dispatch(bookRegisterActions.setBookRegisterUseValidate(false));
      return readMutate(body);
    }

    if (modalState === '읽는중' && startDate) {
      const body: ReadingBookRegisterType = {
        ...registerBody,
        startDate: startDate as Date,
      };
      dispatch(bookRegisterActions.setBookRegisterUseValidate(false));
      return readingMutate(body);
    }

    if (modalState === '읽고싶음') {
      const body: ReadToBookRegisterType = {
        ...registerBody,
      };
      dispatch(bookRegisterActions.setBookRegisterUseValidate(false));
      return readToMutate(body);
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <Stack>
        <RadioButton<string>
          label="등록할 유형을 선택해주세요."
          value={modalState}
          options={options}
          onChange={onChangeModal}
        />
      </Stack>
      <Stack>{renderRegisterComponent(modalState)}</Stack>
      <Stack>
        <Button
          type="submit"
          isLoading={readingLoading || readLoading || readToLoading}
        >
          추가하기
        </Button>
      </Stack>
    </Container>
  );
}
