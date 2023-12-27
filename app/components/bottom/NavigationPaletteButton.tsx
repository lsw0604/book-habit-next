'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import Palette from 'components/palette';
import { IconPalette } from 'style/icon';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.3rem 0.1rem 0.3rem;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.nav};
`;

const CircleBtn = styled.button`
  width: 4rem;
  height: 2.5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.spinner};
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 1.3rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function NavigationPaletteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  const openHandler = useCallback(() => setIsOpen((prev) => !prev), []);

  const handlePaletteOutside = useCallback((event: MouseEvent) => {
    if (
      paletteRef.current &&
      !paletteRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handlePaletteOutside);
    return () => {
      document.removeEventListener('mousedown', handlePaletteOutside);
    };
  }, [isOpen]);

  return (
    <Container ref={paletteRef}>
      {isOpen && <Palette />}
      <CircleBtn onClick={openHandler} aria-label="circle_btn">
        <IconPalette />
      </CircleBtn>
    </Container>
  );
}
