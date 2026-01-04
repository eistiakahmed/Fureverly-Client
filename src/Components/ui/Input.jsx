import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const baseClasses = `
    w-full border rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-gray-400 dark:placeholder:text-gray-500
  `;

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const getStateClasses = () => {
    if (error) {
      return `
        border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20 
        text-red-900 dark:text-red-100 focus:border-red-500 focus:ring-red-500
      `;
    }
    if (success) {
      return `
        border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 
        text-green-900 dark:text-green-100 focus:border-green-500 focus:ring-green-500
      `;
    }
    if (focused) {
      return `
        border-[#F5B22C] dark:border-[#F5B22C] bg-white dark:bg-gray-800 
        text-gray-900 dark:text-white focus:border-[#F5B22C] focus:ring-[#F5B22C]
      `;
    }
    return `
      border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
      text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500
      focus:border-[#F5B22C] focus:ring-[#F5B22C]
    `;
  };

  const inputClasses = `
    ${baseClasses}
    ${sizes[size]}
    ${getStateClasses()}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon || isPassword ? 'pr-10' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const handleFocus = (e) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 dark:text-gray-500">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        
        {(rightIcon || isPassword || error || success) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
            {!isPassword && error && (
              <AlertCircle className="text-red-500" size={20} />
            )}
            {!isPassword && success && (
              <CheckCircle className="text-green-500" size={20} />
            )}
            {!isPassword && !error && !success && rightIcon && (
              <span className="text-gray-400 dark:text-gray-500">
                {rightIcon}
              </span>
            )}
          </div>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className="mt-2">
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle size={16} />
              {error}
            </p>
          )}
          {success && !error && (
            <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <CheckCircle size={16} />
              {success}
            </p>
          )}
          {helperText && !error && !success && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;