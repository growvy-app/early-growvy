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
  const baseStyle = "relative py-3.5 px-10 font-medium text-lg rounded-lg transition-all duration-200";
  const primaryStyle = "text-white hover:opacity-90";
  const disabledStyle = "text-gray-500 cursor-not-allowed";

  const gradientStyle = 
    "before:absolute before:inset-0 before:rounded-xl before:-z-10" +
    " after:absolute after:top-[2px] after:right-[2px] after:bottom-[1.5px] after:left-[2px] after:rounded-[10px] after:-z-10";

  const activeGradient = 
    "before:bg-gradient-to-r before:from-[#7B5BF2] before:via-[#7B5BF2] before:to-[#4B6FEE]" +
    " after:bg-gradient-to-r after:from-[#A251FF] after:via-[#A251FF] after:to-[#5081FE]";

  const disabledGradient = 
    "before:bg-gray-300" +
    " after:bg-gray-200";

  const buttonStyle = disabled ? disabledStyle : primaryStyle;
  const gradientColors = disabled ? disabledGradient : activeGradient;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${buttonStyle} ${gradientStyle} ${gradientColors} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
