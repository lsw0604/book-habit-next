import { MyBookListSchemaType } from '@/schemas/my-book-list.schema';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const myBookRouter = (
  router: AppRouterInstance,
  data: MyBookListSchemaType
) => {
  const myBookURL = `?order=${data.order}&status=${data.status}`;
  router.push(myBookURL);
};
