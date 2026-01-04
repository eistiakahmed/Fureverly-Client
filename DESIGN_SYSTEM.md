# Fureverly Design System

A comprehensive design system that follows global UI & design rules for consistent, accessible, and professional user interfaces.

## 🎨 Design Principles

### 1. Color Palette (Maximum 3 Primary Colors + Neutrals)
- **Primary Navy**: `#092052` - Main brand color for buttons, headers, and key elements
- **Primary Amber**: `#F5B22C` - Secondary brand color for accents and CTAs
- **Primary Cream**: `#FFF9EE` - Background color for warm, welcoming sections
- **Neutrals**: Complete gray scale from 50-900 for text, borders, and backgrounds

### 2. Light & Dark Mode Support
- Automatic theme switching based on user preference
- Proper contrast ratios maintained in both modes
- Semantic color variables that adapt to theme context

### 3. Consistent Layout & Spacing
- Standardized spacing scale: xs(4px), sm(8px), md(16px), lg(24px), xl(32px), 2xl(48px), 3xl(64px)
- Consistent padding and margins across all components
- Proper alignment and visual hierarchy

### 4. Touch-Friendly Design
- Minimum 44px touch targets for all interactive elements
- Proper spacing between clickable elements
- Hover states only on devices that support hover

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   ├── forms/        # Form components
│   └── examples/     # Design system demos
├── styles/
│   └── design-system.css  # Core design system styles
├── utils/
│   └── validation.js      # Form validation utilities
├── hooks/
│   └── useResponsive.js   # Responsive design hook
└── config/
    └── theme.js           # Theme configuration
```

## 🧩 Components

### UI Components

#### Button
```jsx
import { Button } from '../components/ui';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`
**Sizes**: `xs`, `sm`, `md`, `lg`, `xl`

#### Card
```jsx
import { Card } from '../components/ui';

<Card hover padding="lg">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

#### Input
```jsx
import { Input } from '../components/ui';

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error="Invalid email"
  leftIcon={<Mail />}
/>
```

#### Modal
```jsx
import { Modal } from '../components/ui';

<Modal isOpen={isOpen} onClose={onClose} title="Modal Title">
  Modal content
</Modal>
```

### Layout Components

#### Container
```jsx
import { Container } from '../components/layout';

<Container size="default" padding="default">
  Content
</Container>
```

#### Section
```jsx
import { Section } from '../components/layout';

<Section background="gray" padding="lg">
  Section content
</Section>
```

#### Grid
```jsx
import { Grid } from '../components/layout';

<Grid cols={3} gap="lg" responsive>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Form Components

#### Form with Validation
```jsx
import { Form } from '../components/forms';
import { validators } from '../utils/validation';

<Form
  initialValues={{ email: '', password: '' }}
  validationRules={{
    email: [validators.required, validators.email],
    password: [validators.required, validators.password]
  }}
  onSubmit={handleSubmit}
>
  <Form.Field name="email" label="Email" type="email" required />
  <Form.Field name="password" label="Password" type="password" required />
  <Form.Actions submitText="Sign In" />
</Form>
```

## 🎯 Validation System

### Built-in Validators
- `validators.required` - Required field validation
- `validators.email` - Email format validation
- `validators.password` - Strong password validation
- `validators.minLength(n)` - Minimum length validation
- `validators.maxLength(n)` - Maximum length validation
- `validators.phone` - Phone number validation
- `validators.url` - URL validation
- `validators.number` - Number validation
- `validators.positiveNumber` - Positive number validation
- `validators.range(min, max)` - Range validation

### Custom Validation Hook
```jsx
import { useFormValidation } from '../utils/validation';

const { values, errors, handleChange, handleBlur, validateAll } = useFormValidation(
  initialValues,
  validationRules
);
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet Small**: 640px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Desktop Large**: > 1280px

### Responsive Hook
```jsx
import useResponsive from '../hooks/useResponsive';

const { isMobile, isTablet, isDesktop, device } = useResponsive();
```

## 🎨 Theming

### CSS Custom Properties
```css
:root {
  --primary-navy: #092052;
  --primary-amber: #F5B22C;
  --primary-cream: #FFF9EE;
  /* ... more variables */
}
```

### Theme Configuration
```jsx
import theme from '../config/theme';

// Access theme values
const primaryColor = theme.colors.primary.navy;
const spacing = theme.spacing.md;
```

## ♿ Accessibility

### Features
- Proper color contrast ratios (WCAG AA compliant)
- Focus management and visible focus indicators
- Keyboard navigation support
- Screen reader friendly markup
- Touch-friendly interaction targets (44px minimum)
- Semantic HTML structure

### Focus Management
```jsx
// Automatic focus ring on all interactive elements
<Button className="focus-ring">Accessible Button</Button>
```

## 🚀 Loading States

### Skeleton Loading
```jsx
import { Skeleton } from '../components/ui';

<Skeleton.Card />
<Skeleton.Text lines={3} />
<Skeleton.Avatar size="lg" />
```

### Loading Spinners
```jsx
import { LoadingSpinner } from '../components/ui';

<LoadingSpinner size="md" color="primary" text="Loading..." />
```

## 🔔 Toast Notifications

```jsx
import { toast } from '../components/ui';

toast.success('Success message!');
toast.error('Error message!');
toast.info('Info message!');
toast.warning('Warning message!');
```

## 📋 Best Practices

### 1. Component Usage
- Always use design system components instead of custom styling
- Follow the established spacing and sizing scales
- Use semantic color variables instead of hardcoded values

### 2. Responsive Design
- Design mobile-first, then enhance for larger screens
- Use the Grid component for consistent layouts
- Test on multiple device sizes

### 3. Accessibility
- Always provide proper labels for form inputs
- Use semantic HTML elements
- Ensure sufficient color contrast
- Test with keyboard navigation

### 4. Performance
- Use skeleton loading for better perceived performance
- Implement proper loading states
- Optimize images and assets

### 5. Consistency
- Follow the established design patterns
- Use consistent terminology and copy
- Maintain visual hierarchy

## 🛠️ Development

### Getting Started
1. Import the design system CSS in your main CSS file:
```css
@import "./styles/design-system.css";
```

2. Use components from the UI library:
```jsx
import { Button, Card, Input } from './components/ui';
```

3. Follow the responsive design patterns:
```jsx
import { Container, Section, Grid } from './components/layout';
```

### Testing
- Test all components in both light and dark modes
- Verify responsive behavior on different screen sizes
- Check accessibility with screen readers
- Validate form behavior and error states

## 📚 Examples

See `src/components/examples/DesignSystemDemo.jsx` for comprehensive examples of all components and patterns in action.

## 🔄 Updates

When updating the design system:
1. Update the relevant component files
2. Update this documentation
3. Test across all breakpoints and themes
4. Verify accessibility compliance
5. Update the demo page with new examples

---

This design system ensures consistent, accessible, and professional UI across the entire Fureverly application while maintaining flexibility for future enhancements.