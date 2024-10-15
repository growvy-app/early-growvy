import React from 'react';

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  required?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, label, checked, onChange, required }) => {
  return (
    <div className="relative flex items-center">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        required={required}
        className="sr-only" // Hide the default radio button
      />
      <label
        htmlFor={id}
        className={`flex items-center justify-between w-full p-4 cursor-pointer rounded-xl transition-all duration-200 
          border-2 border-transparent
          ${checked
            ? 'gradient-border bg-white text-neutral-900'
            : 'bg-neutral-50 text-neutral-900 hover:border-neutral-500'
          }`}
        style={{
          backgroundImage: checked 
            ? 'linear-gradient(#fff, #fff), linear-gradient(135deg, #A251FF 7.24%, #A251FF 8.44%, #5081FE 125.9%)'
            : 'linear-gradient(#FAFAFA, #FAFAFA), linear-gradient(to right, #E4E4E4, #E4E4E4)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
      >
        <span className="text-lg">{label}</span>
        {checked && (
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </label>
    </div>
  );
};

export default CustomCheckbox;
