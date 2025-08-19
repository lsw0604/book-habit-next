import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { STEP_CONFIG, STEPS } from '../ui/constants';

export const useMultiStepForm = () => {
  const { trigger } = useFormContext();
  const [currentStep, setCurrentStep] = useState<number>(STEPS.FIRST);

  const stepFields = useMemo(
    () => STEP_CONFIG[currentStep as keyof typeof STEP_CONFIG]?.fields || [],
    [currentStep]
  );

  const handleNextStep = async () => {
    const isValid = stepFields.length > 0 ? await trigger(stepFields) : true;

    if (isValid && currentStep < STEPS.LAST) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > STEPS.FIRST) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return {
    currentStep,
    handleNextStep,
    handlePrevStep,
  };
};
