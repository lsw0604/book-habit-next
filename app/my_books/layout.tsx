'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export default function MyBooksLayout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}
