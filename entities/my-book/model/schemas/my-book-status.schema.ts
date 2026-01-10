import { z } from 'zod';

import { MyBookStatus } from '../types';

export const myBookStatusSchema = z.nativeEnum(MyBookStatus);
