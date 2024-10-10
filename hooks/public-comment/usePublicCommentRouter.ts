import { PublicCommentSchemaType } from '@/schemas/public-comment.schema';
import { createPublicCommentUrl } from '@/utils/url';
import { useRouter } from 'next/navigation';

export default function usePublicCommentRouter() {
  const router = useRouter();

  const pushToPublicComment = (params: PublicCommentSchemaType) => {
    const url = createPublicCommentUrl(params);
    router.push(url);
  };

  return { pushToPublicComment };
}
