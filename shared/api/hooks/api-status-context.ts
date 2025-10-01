'use client';

import { createContext, useContext } from 'react';

interface ApiStatusContextValue {
  isInitialized: boolean;
}

// 기본값은 실제 로직에 영향을 주지 않도록 설정합니다.
const ApiStatusContext = createContext<ApiStatusContextValue>({
  isInitialized: false,
});

// 이 Context를 사용하기 위한 커스텀 훅도 함께 만듭니다.
export const useApiStatus = () => {
  const context = useContext(ApiStatusContext);
  if (context === undefined) {
    throw new Error('useApiStatus must be used within an ApiStatusProvider');
  }
  return context;
};

// Provider는 app 계층에서 사용될 것이므로 export 합니다.
export const ApiStatusProvider = ApiStatusContext.Provider;
