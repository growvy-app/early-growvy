import React from "react";
import { FormData } from "../app/page";

interface YesNoQuestionProps {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

const YesNoQuestion: React.FC<YesNoQuestionProps> = ({ formData, updateFormData, onNext, onBack }) => {
  const handleAnswer = (answer: boolean) => {
    updateFormData("yesNoAnswer", answer);
    if (answer) {
      onNext();
    } else {
      // Skip to the end screen
      onNext();
      onNext();
      onNext();
      onNext();
      onNext();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Would you like to take our survey?</h2>
      <div className="space-x-4">
        <button
          onClick={() => handleAnswer(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          No
        </button>
      </div>
      <button onClick={onBack} className="bg-gray-300 px-4 py-2 rounded">
        Back
      </button>
    </div>
  );
};

export default YesNoQuestion;
