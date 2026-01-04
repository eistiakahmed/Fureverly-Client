// Form validation utilities
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
    return null;
  },

  password: (value) => {
    if (!value) return null;
    
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value.length < minLength) {
      return `Password must be at least ${minLength} characters long`;
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return null;
  },

  confirmPassword: (originalPassword) => (value) => {
    if (!value) return null;
    if (value !== originalPassword) {
      return 'Passwords do not match';
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  number: (value) => {
    if (!value) return null;
    if (isNaN(value)) {
      return 'Please enter a valid number';
    }
    return null;
  },

  positiveNumber: (value) => {
    if (!value) return null;
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      return 'Please enter a positive number';
    }
    return null;
  },

  range: (min, max) => (value) => {
    if (!value) return null;
    const num = parseFloat(value);
    if (isNaN(num)) {
      return 'Please enter a valid number';
    }
    if (num < min || num > max) {
      return `Value must be between ${min} and ${max}`;
    }
    return null;
  }
};

// Validate a single field with multiple validators
export const validateField = (value, validatorList = []) => {
  for (const validator of validatorList) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return null;
};

// Validate an entire form object
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(fieldName => {
    const fieldValue = formData[fieldName];
    const fieldValidators = validationRules[fieldName];
    const error = validateField(fieldValue, fieldValidators);
    
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};

// Custom hook for form validation
import { useState, useCallback } from 'react';

export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateSingleField = useCallback((name, value) => {
    if (validationRules[name]) {
      return validateField(value, validationRules[name]);
    }
    return null;
  }, [validationRules]);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateSingleField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateSingleField]);

  const validateAll = useCallback(() => {
    const { errors: newErrors, isValid } = validateForm(values, validationRules);
    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));
    return isValid;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0
  };
};