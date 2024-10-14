import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, required, className, ...props }) => {
  return (
    <div className="relative max-w-sm">
      <label htmlFor={props.id} className="absolute -top-3 left-5 bg-neutral-100 px-2 text-sm font-medium text-gray-500">
        {label}{required && <span className="text-[#786AFE]">*</span>}
      </label>
      <input
        {...props}
        className={`w-full py-3.5 px-5 bg-neutral-100 font-medium border-2 border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:border-[#786AFE] transition-all duration-200 text-lg ${className}`}
      />
    </div>
  );
};

export default Input;
