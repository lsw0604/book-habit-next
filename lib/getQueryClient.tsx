import { queryClient } from 'queries';
import { cache } from 'react';

const getQueryClient = cache(() => queryClient);
export default getQueryClient;
