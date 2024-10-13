import React from "react";
import { FormData } from "../app/page";

interface InitialFormProps {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
}

const InitialForm: React.FC<InitialFormProps> = ({ formData, updateFormData, onNext }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome to our Survey</h1>
      <div>
        <label htmlFor="email" className="block">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value.trim())}
          required
          className="w-full p-2 border rounded"
          maxLength={100}
        />
      </div>
      <div>
        <label htmlFor="name" className="block">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value.trim())}
          required
          className="w-full p-2 border rounded"
          maxLength={50}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
};

export default InitialForm;
