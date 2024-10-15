import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ currentStep, totalSteps }) => {
  // Adjust the progress calculation to show initial progress
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="p-4">
      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-gradient rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
