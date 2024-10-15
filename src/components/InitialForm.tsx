import React from "react";
import { FormData } from "../app/page";
import Button from "./Button";
import Input from "./Input";

interface InitialFormProps {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

const InitialForm: React.FC<InitialFormProps> = ({ formData, updateFormData, onNext, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail(formData.email) && isValidName(formData.name)) {
      onNext();
    } else {
      alert("Please enter a valid email and name.");
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name: string): boolean => {
    return name.length >= 2 && name.length <= 50;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7 w-full mx-auto relative">
      <div className="space-y-1">
        <h1 className="title-gradient text-6xl leading-[0.9] mb-2" style={{ fontWeight: 900 }}>
          Be First and don&apos;t Miss Out.
        </h1>
        <p className="text-xl">Join the waiting list to be among the first to try out Growvy!</p>
      </div>
      <div className="space-y-3.5 flex flex-col gap-2">
        <Input
          id="name"
          label="First Name"
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value.trim())}
          required
          maxLength={50}
          placeholder="Fred"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value.trim())}
          required
          maxLength={100}
          placeholder="fred@growvy.app"
        />
      </div>
      <div className="flex space-x-4">
        <Button 
          type="submit" 
          disabled={!isValidEmail(formData.email) || !isValidName(formData.name)}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default InitialForm;
