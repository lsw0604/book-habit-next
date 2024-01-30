import { FormEvent } from 'react';
import { v4 } from 'uuid';
import { BookIcon } from 'lucide-react';

import { Button } from '../ui/button';
import ModalHeader from './modal-header';
import ImageWrapper from '../common/image-wrapper';

import { RootState, useAppSelector } from '@/app/store';

export default function RegisterSearchBookModal() {
  const { authors, thumbnail, title, contents, url, ...rest } = useAppSelector(
    (state: RootState) => state.searchBookRegister
  );
  const { isLogged } = useAppSelector((state: RootState) => state.user);

  const registerBody: BookRegisterType = {
    authors: authors.join(','),
    thumbnail,
    title,
    contents,
    url,
    ...rest,
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLogged) return console.log('로그인이 필요합니다.');
    console.log(registerBody);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <ModalHeader icon={<BookIcon />} title="내 서재에 책을 등록해요." />
      <form onSubmit={onSubmit} className="w-full h-full flex flex-col">
        <div className="h-[190px] w-full flex gap-2">
          <div className="h-full w-[120px] flex justify-center items-center">
            <ImageWrapper src={thumbnail} alt={v4()} height={174} width={120} />
          </div>
          <div className="h-full w-full flex flex-col justify-between">
            <h1 className="text-xl w-[230px] truncate overflow-hidden">
              {title}
            </h1>
            <p className="overflow-auto whitespace-pre-line line-clamp-5">
              {contents}
            </p>
            <a className="mb-2 text-sm" target="_blank" href={url}>
              더보기
            </a>
          </div>
        </div>
        <Button className="w-full" type="submit">
          추가하기
        </Button>
      </form>
    </div>
  );
}
