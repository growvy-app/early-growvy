import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  disabled = false,
  children,
  className = '',
}) => {
  const baseStyle = "relative py-3.5 px-10 font-medium text-lg rounded-xl transition-all duration-200 overflow-hidden";
  const primaryStyle = "text-white hover:opacity-90 bg-primary-gradient";
  const disabledStyle = "bg-gray-300 text-gray-500 cursor-not-allowed";

  const buttonStyle = disabled ? disabledStyle : primaryStyle;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${buttonStyle} ${className}`}
    >
      <span 
        className={`absolute inset-[2px] inset-b-[0px] rounded-[10px] ${disabled ? 'bg-gray-200' : 'bg-primary-gradient'}`} 
        style={{ filter: disabled ? 'brightness(1.05)' : 'brightness(1.2)' }}
      ></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
