import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ currentStep, totalSteps }) => {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full h-2 bg-neutral-200">
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
