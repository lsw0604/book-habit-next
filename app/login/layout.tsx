'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {children}
    </div>
  );
}
