import { useRouter } from 'next/navigation';
import { SearchParamsSchemaType } from '../form/search/schema/params.schema';
import { createSearchUrl } from '@/utils/url';

export default function useSearchRouter() {
  const router = useRouter();

  const pushToSearch = (params: Partial<SearchParamsSchemaType>) => {
    const url = createSearchUrl(params);
    router.push(url);
  };

  return { pushToSearch };
}
