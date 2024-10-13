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
    <div className="space-y-6">
      <h2 className="title-gradient text-5xl font-bold mb-6">Want to Answer 4 Quick Questions for a Free 3-Month Pro Tier?</h2>
      <p className="text-xl mb-8">Your insights are vital for us to create the best possible app for you. Help us understand your needs by answering these quick questions!</p>
      <div className="space-x-4">
        <Button onClick={() => handleAnswer(true)}>
          Yes
        </Button>
        <Button onClick={() => handleAnswer(false)}>
          No
        </Button>
      </div>
      <Button onClick={onBack}>
        Back
      </Button>
    </div>
  );
};

export default YesNoQuestion;
