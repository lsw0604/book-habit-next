import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/queries';

interface QueryProviderProps {
  children: JSX.Element;
  client?: QueryClient;
}

export default function QueryProvider({
  children,
  client = queryClient,
}: QueryProviderProps) {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools position="top" />
    </QueryClientProvider>
  );
}
