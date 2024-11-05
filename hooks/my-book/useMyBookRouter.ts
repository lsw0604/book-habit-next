import { useRouter } from 'next/navigation';

import { MyBookParamsSchemaType } from '@/hooks/form/my-book/schema/params.schema';
import { createMyBookUrl } from '@/utils/url';

export default function useMyBookRouter() {
  const router = useRouter();

  const pushToMyBookList = (params: Partial<MyBookParamsSchemaType>) => {
    const url = createMyBookUrl(params);
    router.push(url);
  };

  return { pushToMyBookList };
}
