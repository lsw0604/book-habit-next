import { SearchType } from '@/schemas/search.schema';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const searchRouter = (router: AppRouterInstance, data: SearchType) => {
  const searchURL = `?query=${data.query}&size=${data.size}&sort=${data.sort}&target=${data.target}`;
  router.push(searchURL);
};
