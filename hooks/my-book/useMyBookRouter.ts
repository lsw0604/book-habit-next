import { useRouter } from 'next/navigation';
import { MyBookListSchemaType } from '@/schemas/my-book-list.schema';
import { createMyBookUrl } from '@/utils/url';

export default function useMyBookRouter() {
  const router = useRouter();

  const pushToMyBookList = (params: Partial<MyBookListSchemaType>) => {
    const url = createMyBookUrl(params);
    router.push(url);
  };

  return { pushToMyBookList };
}
