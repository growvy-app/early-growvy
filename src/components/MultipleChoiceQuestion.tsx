import React from "react";
import { FormData } from "../app/page";
import Button from "./Button";

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

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...formData.multipleChoiceAnswers];
    newAnswers[questionNumber - 1] = e.target.value;
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
      <div className="space-y-4">
        {options[questionNumber - 1].map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${index}`}
              name={`question-${questionNumber}`}
              value={option}
              checked={formData.multipleChoiceAnswers[questionNumber - 1] === option}
              onChange={handleOptionChange}
              required
              className="mr-2"
            />
            <label htmlFor={`option-${index}`} className="text-lg">
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
      <button className="absolute -top-8 left-0 text-lg font-sans" onClick={onBack}>Back</button>
        <Button type="submit">
          {questionNumber === 4 ? "Submit" : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default MultipleChoiceQuestion;
