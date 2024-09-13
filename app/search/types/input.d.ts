import { searchSchema } from '@/schemas/search.schema';
import { z } from 'zod';

export type SearchInputType = z.infer<typeof searchSchema>;
