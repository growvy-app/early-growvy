"use client";

import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import InitialForm from "../components/InitialForm";
import YesNoQuestion from "../components/YesNoQuestion";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";
import EndScreen from "../components/EndScreen";
import { supabase } from "../lib/supabase";
import { createOrUpdateContact } from "../lib/hubspot";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
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

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Save to Supabase
      const { error } = await supabase
        .from("survey_responses")
        .insert({
          email: formData.email,
          name: formData.name,
          yes_no_answer: formData.yesNoAnswer,
          multiple_choice_answers: formData.multipleChoiceAnswers,
        });

      if (error) throw error;

      // Create or update HubSpot contact
      await createOrUpdateContact(formData.email, formData.name);

      // Move to the end screen
      setCurrentStep(6);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
            onNext={handleSubmit}
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
