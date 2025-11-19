import {
  type TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from 'react-redux';

import type { RootState, AppDispatch } from '@/app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
