import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/queries';

interface QueryProviderProps {
  children: JSX.Element;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
