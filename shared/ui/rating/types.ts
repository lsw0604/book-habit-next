import { MouseEvent } from 'react';

export interface RatingProps {
  rating: number;
  onChange: (value: number) => void;
  className?: string;
}

export interface StarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  index: number;
  isClicked: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>, index: number) => void;
}
