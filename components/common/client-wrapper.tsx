'use client';

import { ReactNode, Fragment } from 'react';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
