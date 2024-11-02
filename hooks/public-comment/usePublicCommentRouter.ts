import { useRouter } from 'next/navigation';
import { createPublicCommentUrl } from '@/utils/url';
import { publicCommentParamsSchemaType } from '../form/public-comment/schema/params.schema';

export default function usePublicCommentRouter() {
  const router = useRouter();

  const pushToPublicComment = (params: publicCommentParamsSchemaType) => {
    const url = createPublicCommentUrl(params);
    router.push(url);
  };

  return { pushToPublicComment };
}
