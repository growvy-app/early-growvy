import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  disabled = false,
  children,
  className = '',
  variant = 'primary',
}) => {
  const baseStyle = "py-3.5 px-10 font-medium text-lg rounded-xl transition-all duration-200 relative";
  const primaryStyle = "text-neutral-50 hover:opacity-90 bg-primary-gradient";
  const secondaryStyle = "bg-white";
  const disabledStyle = "bg-neutral-300 text-neutral-500 cursor-not-allowed";

  const buttonStyle = disabled ? disabledStyle : (variant === 'primary' ? primaryStyle : secondaryStyle);

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${buttonStyle} ${className} group`}
    >
      {variant === 'secondary' && !disabled && (
        <>
          <span className="absolute inset-0 rounded-xl bg-primary-gradient opacity-20 transition-opacity duration-200 group-hover:opacity-100"></span>
          <span className="absolute inset-[2px] rounded-[0.625rem] bg-white"></span>
          <span className="relative z-10 bg-primary-gradient bg-clip-text text-transparent">{children}</span>
        </>
      )}
      {(variant === 'primary' || disabled) && (
        <span className="relative z-10">{children}</span>
      )}
    </button>
  );
};

export default Button;
