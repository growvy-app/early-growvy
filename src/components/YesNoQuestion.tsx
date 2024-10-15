import React from "react";
import { FormData } from "../app/page";
import Button from "./Button";

interface YesNoQuestionProps {
  updateFormData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (answer: boolean) => void;
}

const YesNoQuestion: React.FC<YesNoQuestionProps> = ({ updateFormData, onNext, onBack, onSubmit }) => {
  const handleAnswer = (answer: boolean) => {
    updateFormData("yesNoAnswer", answer);
    if (answer) {
      onNext();
    } else {
      onSubmit(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="space-y-1">
        <h2 className="title-gradient text-3xl md:text-6xl leading-[0.9] mb-2">Want to Answer 4 Quick Questions for a Free 3-Month Pro Tier?</h2>
        <p className="text-xl mb-8">Your insights are vital for us to create the best possible app for you. Help us understand your needs by answering these quick questions!</p>
      </div>
      <div className="space-x-4">
        <Button onClick={() => handleAnswer(true)}>
          Yes
        </Button>
        <Button onClick={() => handleAnswer(false)} variant="secondary">
          No
        </Button>
      </div>
      <button 
        className="absolute -top-14 left-0 text-lg font-sans text-neutral-700 flex items-center" 
        onClick={onBack}
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
    </div>
  );
};

export default YesNoQuestion;
