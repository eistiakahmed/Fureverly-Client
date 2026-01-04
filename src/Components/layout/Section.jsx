import React from 'react';
import Container from './Container';

const Section = ({
  children,
  className = '',
  containerSize = 'default',
  padding = 'default',
  background = 'default',
  ...props
}) => {
  const backgrounds = {
    default: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    cream: 'bg-[#FFF9EE] dark:bg-gray-800',
    primary: 'bg-[#092052] text-white',
    secondary: 'bg-[#F5B22C] text-white'
  };

  const paddings = {
    none: '',
    sm: 'py-8',
    default: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20',
    xl: 'py-20 sm:py-24'
  };

  return (
    <section 
      className={`
        ${backgrounds[background]}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};

export default Section;