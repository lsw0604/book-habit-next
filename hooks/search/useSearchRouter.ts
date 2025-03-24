import { useRouter } from 'next/navigation';
import { SearchParamsType } from '@/schemas/search/params';
import { createSearchUrl } from '@/utils/url';

export default function useSearchRouter() {
  const router = useRouter();

  const pushToSearch = (params: Partial<SearchParamsType>) => {
    const url = createSearchUrl(params);
    router.push(url);
  };

  return { pushToSearch };
}
