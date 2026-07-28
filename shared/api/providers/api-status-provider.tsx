'use client';

import { createContext, useContext } from 'react';

interface ApiStatusContextValue {
  isInitialized: boolean;
}

const ApiStatusContext = createContext<ApiStatusContextValue>({
  isInitialized: false,
});

export const useApiStatus = () => {
  const context = useContext(ApiStatusContext);
  if (context === undefined) {
    throw new Error('useApiStatus must be used within an ApiStatusProvider');
  }
  return context;
};

export const ApiStatusProvider = ApiStatusContext.Provider;
