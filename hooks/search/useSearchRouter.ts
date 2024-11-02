import { useRouter } from 'next/navigation';
import { SearchSchemaType } from '../form/search/schema/params.schema';
import { createSearchUrl } from '@/utils/url';

export default function useSearchRouter() {
  const router = useRouter();

  const pushToSearch = (params: Partial<SearchSchemaType>) => {
    const url = createSearchUrl(params);
    router.push(url);
  };

  return { pushToSearch };
}
