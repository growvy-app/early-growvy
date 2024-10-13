"use client";

import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import InitialForm from "../components/InitialForm";
import YesNoQuestion from "../components/YesNoQuestion";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";
import EndScreen from "../components/EndScreen";

type FormData = {
  email: string;
  name: string;
  yesNoAnswer: boolean | null;
  multipleChoiceAnswers: string[];
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    yesNoAnswer: null,
    multipleChoiceAnswers: ["", "", "", ""],
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const updateFormData = (key: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // For now, we'll just log the form data and move to the end screen
    console.log("Form submitted:", formData);
    setCurrentStep(6);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InitialForm formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 1:
        return <YesNoQuestion formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 2:
      case 3:
      case 4:
      case 5:
        return (
          <MultipleChoiceQuestion
            questionNumber={currentStep - 1}
            formData={formData}
            updateFormData={updateFormData}
            onNext={currentStep === 5 ? handleSubmit : handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return <EndScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-8">
      <ProgressBar currentStep={currentStep} totalSteps={7} />
      {renderStep()}
    </div>
  );
}
