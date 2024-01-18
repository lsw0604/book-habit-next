'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

const Container = styled.form`
  width: 100%;
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  position: relative;

  .circle_btn {
    &::placeholder {
      line-height: 16px;
      font-size: 14px;
      font-weight: 700;
      color: ${({ theme }) => theme.mode.typo_sub};
    }
  }
`;

export default function SearchInput() {}
