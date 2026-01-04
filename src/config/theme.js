// Theme configuration for Fureverly
export const theme = {
  // Primary color palette (maximum 3 colors + neutrals)
  colors: {
    primary: {
      navy: '#092052',
      amber: '#F5B22C',
      cream: '#FFF9EE'
    },
    
    // Semantic colors
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    },
    
    // Neutral colors
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827'
      }
    }
  },

  // Typography scale
  typography: {
    fontFamily: {
      primary: ['Inter', 'sans-serif'],
      heading: ['Yeseva One', 'serif'],
      accent: ['Tinos', 'serif']
    },
    
    fontSize: {
      'display-1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      'display-2': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      'h3': ['1.5rem', { lineHeight: '1.4' }],
      'h4': ['1.25rem', { lineHeight: '1.4' }],
      'body-lg': ['1.125rem', { lineHeight: '1.6' }],
      'body': ['1rem', { lineHeight: '1.6' }],
      'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      'caption': ['0.75rem', { lineHeight: '1.4' }]
    }
  },

  // Spacing scale
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },

  // Border radius scale
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px'
  },

  // Shadow scale
  boxShadow: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Animation durations
  animation: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s'
  },

  // Component-specific configurations
  components: {
    button: {
      height: {
        xs: '32px',
        sm: '36px',
        md: '44px', // Touch-friendly minimum
        lg: '52px',
        xl: '60px'
      }
    },
    
    input: {
      height: {
        sm: '36px',
        md: '44px', // Touch-friendly minimum
        lg: '52px'
      }
    },
    
    card: {
      padding: {
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px'
      }
    }
  }
};

// Dark mode color overrides
export const darkTheme = {
  colors: {
    neutral: {
      white: '#0F172A',
      black: '#FFFFFF',
      gray: {
        50: '#1E293B',
        100: '#334155',
        200: '#475569',
        300: '#64748B',
        400: '#94A3B8',
        500: '#CBD5E1',
        600: '#E2E8F0',
        700: '#F1F5F9',
        800: '#F8FAFC',
        900: '#FFFFFF'
      }
    }
  }
};

export default theme;