import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, required, className, ...props }) => {
  return (
    <div className="relative max-w-sm">
      <label htmlFor={props.id} className="absolute -top-3 left-5 bg-neutral-50 px-2 text-sm font-medium text-neutral-500">
        {label}{required && <span className="text-primary">*</span>}
      </label>
      <input
        {...props}
        className={`w-full py-3.5 px-5 bg-neutral-50 font-medium border-2 border-neutral-300 rounded-2xl text-neutral-900 focus:outline-none focus:border-primary transition-all duration-200 text-lg placeholder-neutral-500 ${className}`}
      />
    </div>
  );
};

export default Input;
