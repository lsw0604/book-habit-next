import { useRouter } from 'next/navigation';

interface Navigation {
  push: (path: string) => void;
  replace: (path: string) => void;
  refresh: () => void;
}

export const createNavigation = (
  router: ReturnType<typeof useRouter>,
  pathname: string | null,
  searchParams: URLSearchParams | null
): Navigation => {
  return {
    push: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    refresh: () => router.refresh(),
  };
};
