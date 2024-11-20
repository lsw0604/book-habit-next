import { useRouter } from 'next/navigation';

function useServiceInstance<T>(serviceFactory: (router: any) => T): T {
  const router = useRouter();
  return serviceFactory(router);
}

export default useServiceInstance;
