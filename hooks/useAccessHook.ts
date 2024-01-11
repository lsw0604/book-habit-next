import { useEffect } from 'react';

import { accessAPI } from '@/app/lib/api/auth';
import { useAppDispatch } from '@/app/store';
import { userActions } from '@/app/store/user';

export default function useAccessHook() {
  const dispatch = useAppDispatch();
  const fetch = async () => {
    try {
      const response = await accessAPI();
      const { message, status, ...rest } = response;
      if (message === 'ACCESS_TOKEN_VERIFIED' && status === 'success') {
        dispatch(userActions.setUserState({ ...rest, isLogged: true }));
      }
    } catch (err: any) {
      if (err && err.response && err.response.data) {
        dispatch(userActions.setUserInitialState());
      }
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('ACCESS')) {
      fetch();
    }
  }, []);
}
