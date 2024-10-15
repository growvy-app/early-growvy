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
  const baseStyle = "py-3.5 px-10 font-medium text-lg rounded-xl transition-all duration-200";
  const primaryStyle = "text-neutral-50 hover:opacity-90 bg-primary-gradient";
  const disabledStyle = "bg-neutral-300 text-neutral-500 cursor-not-allowed";

  const buttonStyle = disabled ? disabledStyle : primaryStyle;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${buttonStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
