import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'queries';

interface IProps {
  children: JSX.Element;
}

export default function QueryProvider({ children }: IProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
