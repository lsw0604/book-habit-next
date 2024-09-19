import { RootState, useAppSelector } from '@/store';

export const userSelector = useAppSelector((state: RootState) => state.user);
