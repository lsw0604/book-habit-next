export interface StepIndicatorItem {
  id: string;
  label: string;
}

export interface StepIndicatorProps {
  steps: StepIndicatorItem[];
  currentIndex: number;
  /** 지나온 단계를 눌러 되돌아갈 수 있게 한다. 넘기지 않으면 표시 전용이다. */
  onStepSelect?: (index: number) => void;
  className?: string;
}
