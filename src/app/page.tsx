"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import InitialForm from "@/components/InitialForm";
import YesNoQuestion from "@/components/YesNoQuestion";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
import EndScreen from "@/components/EndScreen";
import { getSupabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

const DynamicSupabaseComponent = dynamic(
  () => import('@/components/SupabaseComponent'),
  { ssr: false }
);

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

  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const supabase = getSupabase();
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      const { data, error } = await supabase
        .from('survey_responses')
        .insert({
          email: formData.email,
          name: formData.name,
          yes_no_answer: formData.yesNoAnswer,
          multiple_choice_answers: formData.yesNoAnswer ? formData.multipleChoiceAnswers : null
        });

      if (error) {
        throw error;
      }

      console.log('Form submitted successfully:', data);
      setCurrentStep(6); // Move to the end screen
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      alert(`There was an error submitting your form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleYesNoSubmit = async (answer: boolean) => {
    updateFormData("yesNoAnswer", answer);
    await handleSubmit();
  };

  const renderStep = () => {
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
  };

  return (
    <>
      <div className="w-full">
        <ProgressBar currentStep={currentStep} totalSteps={7} />
      </div>
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {renderStep()}
          <DynamicSupabaseComponent />
        </div>
      </div>
    </>
  );
}
