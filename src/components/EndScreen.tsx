import React from "react";
import { FormData } from "../app/page";

interface EndScreenProps {
  formData: FormData;
}

const EndScreen: React.FC<EndScreenProps> = ({ formData }) => {
  return (
    <div className="text-center">
      <h2 className="title-gradient text-5xl font-bold mb-8">Thank you, {formData.name}!</h2>
      <p className="text-xl mb-4">You'll be among the first to know when Growvy launches.</p>
      <p className="text-xl">Stay tuned for exciting updates!</p>
    </div>
  );
};

export default EndScreen;
