'use client';

import styled from 'styled-components';
import Image from 'next/image';

import { IconImage } from 'style/icon';

interface IProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
}

const Container = styled.div<{ $width: number; $height: number }>`
  background-color: rgba(0, 0, 0, 0.08);
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  img {
    border-radius: 5px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function ImageWrapper({ src, alt, height, width }: IProps) {
  return (
    <Container $height={height} $width={width}>
      {src ? (
        <Image src={src} alt={alt} height={height} width={width} priority />
      ) : (
        <IconImage />
      )}
    </Container>
  );
}
