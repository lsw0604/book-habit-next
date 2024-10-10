import { useRouter } from "next/navigation";

export default function useLoginRouter() {
  const router = useRouter();

  const onSuccessCallback = () => {
    router.push('/search');
  }
  
  return {
    onSuccessCallback
  }
}