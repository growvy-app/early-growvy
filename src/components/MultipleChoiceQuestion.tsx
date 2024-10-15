import React from "react";
import { FormData } from "../app/page";
import Button from "./Button";
import CustomCheckbox from "./CustomCheckbox";

interface MultipleChoiceQuestionProps {
  questionNumber: number;
  formData: FormData;
  updateFormData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionNumber,
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  const questions = [
    "What inspires you to learn about business?",
    "How would you describe your current business knowledge?",
    "Do you believe learning more about business could benefit you?",
    "What's your ideal investment for a pro tier subscription?",
  ];

  const options = [
    ["I dream of creating my own business one day", "I want to advance my career", "I'm here to have fun and explore"],
    ["Beginner – I'm just starting out", "Intermediate – I know some basics", "Advanced – I have strong business knowledge"],
    ["Absolutely", "Not really", "I'm not sure yet"],
    ["$5/month", "$8/month", "$12/month", "$16/month"],
  ];

  const handleOptionChange = (selectedOption: string) => {
    const newAnswers = [...formData.multipleChoiceAnswers];
    newAnswers[questionNumber - 1] = selectedOption;
    updateFormData("multipleChoiceAnswers", newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      <div className="space-y-1">
        <h2 className="title-gradient text-6xl leading-[0.9] mb-2">{questions[questionNumber - 1]}</h2>
      </div>
      <div className="space-y-2">
        {options[questionNumber - 1].map((option, index) => (
          <CustomCheckbox
            key={index}
            id={`option-${index}`}
            label={option}
            checked={formData.multipleChoiceAnswers[questionNumber - 1] === option}
            onChange={() => handleOptionChange(option)}
            required
          />
        ))}
      </div>
      <div className="flex space-x-4">
        <Button type="submit">
          {questionNumber === 4 ? "Submit" : "Next"}
        </Button>
      </div>
      <button 
        type="button"
        className="absolute -top-14 left-0 text-lg font-sans text-neutral-700" 
        onClick={onBack}
      >
        Back
      </button>
    </form>
  );
};

export default MultipleChoiceQuestion;
