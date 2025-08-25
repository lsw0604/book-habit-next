import { z } from 'zod';

import { MyBookStatus } from '../model';

export const myBookStatusSchema = z.nativeEnum(MyBookStatus);
