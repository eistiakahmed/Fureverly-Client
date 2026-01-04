import React from 'react';
import { useFormValidation } from '../../utils/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Form = ({
  children,
  onSubmit,
  initialValues = {},
  validationRules = {},
  className = '',
  ...props
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset
  } = useFormValidation(initialValues, validationRules);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  };

  // Clone children and inject form props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        reset
      });
    }
    return child;
  });

  return (
    <form 
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      noValidate
      {...props}
    >
      {childrenWithProps}
    </form>
  );
};

const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  className = '',
  ...props
}) => {
  return (
    <Input
      label={label}
      type={type}
      placeholder={placeholder}
      value={values?.[name] || ''}
      onChange={(e) => handleChange?.(name, e.target.value)}
      onBlur={() => handleBlur?.(name)}
      error={touched?.[name] && errors?.[name]}
      required={required}
      className={className}
      {...props}
    />
  );
};

const FormActions = ({ 
  children, 
  submitText = 'Submit',
  cancelText = 'Cancel',
  onCancel,
  loading = false,
  className = ''
}) => (
  <div className={`flex flex-col sm:flex-row gap-3 pt-4 ${className}`}>
    {children || (
      <>
        {onCancel && (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel}
            fullWidth
            className="sm:w-auto"
          >
            {cancelText}
          </Button>
        )}
        <Button 
          type="submit" 
          loading={loading}
          fullWidth
          className="sm:w-auto sm:ml-auto"
        >
          {submitText}
        </Button>
      </>
    )}
  </div>
);

Form.Field = FormField;
Form.Actions = FormActions;

export default Form;