import React from "react";

interface MultipleChoiceQuestionProps {
  questionNumber: number;
  formData: {
    multipleChoiceAnswers: string[];
  };
  updateFormData: (key: string, value: string[]) => void;
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
    "What is your favorite color?",
    "How often do you exercise?",
    "What's your preferred mode of transportation?",
    "How many hours of sleep do you get on average?",
  ];

  const options = [
    ["Red", "Blue", "Green", "Yellow"],
    ["Daily", "2-3 times a week", "Once a week", "Rarely"],
    ["Car", "Public transport", "Bicycle", "Walking"],
    ["Less than 6 hours", "6-7 hours", "7-8 hours", "More than 8 hours"],
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">{questions[questionNumber - 1]}</h2>
      {options[questionNumber - 1].map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option-${index}`}
            name={`question-${questionNumber}`}
            value={option}
            checked={formData.multipleChoiceAnswers[questionNumber - 1] === option}
            onChange={handleOptionChange}
            required
          />
          <label htmlFor={`option-${index}`} className="ml-2">
            {option}
          </label>
        </div>
      ))}
      <div className="space-x-4">
        <button type="button" onClick={onBack} className="bg-gray-300 px-4 py-2 rounded">
          Back
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {questionNumber === 4 ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default MultipleChoiceQuestion;
