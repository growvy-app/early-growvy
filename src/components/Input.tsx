import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, required, className, ...props }) => {
  return (
    <div className="relative">
      <label htmlFor={props.id} className="absolute -top-3.5 left-6 bg-white px-2 text-base font-medium text-gray-500">
        {label}{required && <span className="text-[#786AFE]">*</span>}
      </label>
      <input
        {...props}
        className={`w-full py-4 px-6 bg-white font-medium border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:border-[#786AFE] transition-all duration-200 text-xl ${className}`}
      />
    </div>
  );
};

export default Input;
