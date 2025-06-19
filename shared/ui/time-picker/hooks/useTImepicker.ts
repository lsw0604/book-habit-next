import { useState } from 'react';

export const useTimepicker = () => {
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const [second, setSecond] = useState<string>('00');

  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
};
