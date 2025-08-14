import { z } from 'zod';

import { MyBookStatus } from './my-book.model';

export const myBookStatusSchema = z.nativeEnum(MyBookStatus);
