import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles =
    'focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center';
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-6 py-3',
  };
  const variantStyles = {
    primary:
      'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
    secondary:
      'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200',
    danger:
      'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300',
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
