import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 600000,
          cacheTime: 900000,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
          retry: 0,
        },
        mutations: {
          retry: 0,
        },
      },
    })
);
export default getQueryClient;
