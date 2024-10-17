"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import ProgressBar from "@/components/ProgressBar";
import InitialForm from "@/components/InitialForm";
import YesNoQuestion from "@/components/YesNoQuestion";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
import EndScreen from "@/components/EndScreen";

export type FormData = {
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
  const totalSteps = 6;

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  const updateFormData = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      console.log('Submitting form data:', JSON.stringify(formData, null, 2));
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Server response:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to submit form');
      }

      console.log('Form submitted successfully:', data);
      setCurrentStep(6); // Move to the end screen
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      alert(`There was an error submitting your form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [formData]);

  const handleYesNoSubmit = useCallback(async (answer: boolean) => {
    updateFormData("yesNoAnswer", answer);
    await handleSubmit();
  }, [updateFormData, handleSubmit]);

  const renderStep = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <InitialForm formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 1:
        return <YesNoQuestion updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} onSubmit={handleYesNoSubmit} />;
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
        return <EndScreen formData={formData} />;
      default:
        return null;
    }
  }, [currentStep, formData, updateFormData, handleNext, handleBack, handleSubmit, handleYesNoSubmit]);

  return (
    <>
      <div className="w-full absolute top-0 left-0 right-0 z-50">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="flex-grow flex items-center h-svh justify-center p-8">
        <div className="w-full max-w-3xl">
          {renderStep}
        </div>
      </div>
    </>
  );
}
