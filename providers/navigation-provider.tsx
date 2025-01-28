import { setNavigationService } from '@/service/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const router = useRouter();
  useEffect(() => {
    setNavigationService({
      navigate: async (path, options) => {
        await router.push(path, options);
      },
    });
  }, [router]);

  return <>{children}</>;
};
