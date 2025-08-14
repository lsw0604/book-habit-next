import { MyBookStatus } from '@/entities/my-book/model';

export type FilterMyBookStatus = MyBookStatus | 'ALL';

export const AllFilterMyBookStatus = {
  ...MyBookStatus,
  ALL: 'ALL',
} as const;

export enum FilterMyBookOrder {
  desc = 'desc',
  asc = 'asc',
}
