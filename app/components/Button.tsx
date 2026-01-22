import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-lg transition-all duration-150
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98] hover:scale-[1.02]
    disabled:hover:scale-100 disabled:active:scale-100
  `;

  const variants = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700 hover:shadow-md
      active:bg-blue-800
      focus:ring-blue-500
      disabled:bg-blue-600
    `,
    secondary: `
      bg-gray-600 text-white
      hover:bg-gray-700 hover:shadow-md
      active:bg-gray-800
      focus:ring-gray-500
      disabled:bg-gray-600
    `,
    success: `
      bg-green-600 text-white
      hover:bg-green-700 hover:shadow-md
      active:bg-green-800
      focus:ring-green-500
      disabled:bg-green-600
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700 hover:shadow-md
      active:bg-red-800
      focus:ring-red-500
      disabled:bg-red-600
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
