import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Input, 
  LoadingSpinner, 
  Skeleton, 
  Modal, 
  Badge,
  toast 
} from '../ui';
import { Container, Section, Grid } from '../layout';
import { Form } from '../forms';
import { validators } from '../../utils/validation';
import { Heart, Star, ShoppingCart, User, Mail, Phone } from 'lucide-react';

const DesignSystemDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    toast.success('Form submitted successfully!');
    console.log('Form values:', values);
  };

  const showToasts = () => {
    toast.success('Success message!');
    setTimeout(() => toast.error('Error message!'), 500);
    setTimeout(() => toast.info('Info message!'), 1000);
    setTimeout(() => toast.warning('Warning message!'), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Section background="primary" padding="lg">
        <div className="text-center">
          <h1 className="text-display-1 font-bold text-white mb-4">
            Fureverly Design System
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto">
            A comprehensive design system following global UI rules with consistent 
            colors, spacing, responsive design, and accessibility features.
          </p>
        </div>
      </Section>

      {/* Color Palette */}
      <Section>
        <h2 className="text-h2 font-semibold text-center mb-12">Color Palette</h2>
        <Grid cols={3} gap="lg">
          <Card padding="lg" className="text-center">
            <div className="w-20 h-20 bg-[#092052] rounded-full mx-auto mb-4"></div>
            <h3 className="text-h4 font-semibold mb-2">Primary Navy</h3>
            <p className="text-body-sm text-gray-600 dark:text-gray-400">#092052</p>
          </Card>
          <Card padding="lg" className="text-center">
            <div className="w-20 h-20 bg-[#F5B22C] rounded-full mx-auto mb-4"></div>
            <h3 className="text-h4 font-semibold mb-2">Primary Amber</h3>
            <p className="text-body-sm text-gray-600 dark:text-gray-400">#F5B22C</p>
          </Card>
          <Card padding="lg" className="text-center">
            <div className="w-20 h-20 bg-[#FFF9EE] border-2 border-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="text-h4 font-semibold mb-2">Primary Cream</h3>
            <p className="text-body-sm text-gray-600 dark:text-gray-400">#FFF9EE</p>
          </Card>
        </Grid>
      </Section>

      {/* Buttons */}
      <Section background="gray">
        <h2 className="text-h2 font-semibold text-center mb-12">Buttons</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-h4 font-semibold mb-4">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-h4 font-semibold mb-4">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          <div>
            <h3 className="text-h4 font-semibold mb-4">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button leftIcon={<Heart />}>With Icon</Button>
              <Button rightIcon={<ShoppingCart />}>Right Icon</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section>
        <h2 className="text-h2 font-semibold text-center mb-12">Cards</h2>
        <Grid cols={3} gap="lg">
          <Card hover>
            <Card.Header>
              <Card.Title>Default Card</Card.Title>
              <Card.Description>
                This is a default card with hover effects
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-body-sm text-gray-600 dark:text-gray-400">
                Card content goes here with proper spacing and typography.
              </p>
            </Card.Content>
            <Card.Footer>
              <Button size="sm" fullWidth>Action</Button>
            </Card.Footer>
          </Card>

          <Card variant="elevated" padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F5B22C] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-h4 font-semibold mb-2">Elevated Card</h3>
              <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-4">
                Enhanced shadow and styling
              </p>
              <Badge variant="success">Featured</Badge>
            </div>
          </Card>

          <Card variant="outlined" padding="lg">
            <h3 className="text-h4 font-semibold mb-4">Outlined Card</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User size={16} className="text-gray-400" />
                <span className="text-body-sm">John Doe</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-body-sm">john@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-body-sm">+1 234 567 8900</span>
              </div>
            </div>
          </Card>
        </Grid>
      </Section>

      {/* Forms */}
      <Section background="cream">
        <h2 className="text-h2 font-semibold text-center mb-12">Forms & Inputs</h2>
        <div className="max-w-2xl mx-auto">
          <Card padding="xl">
            <Form
              initialValues={{
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
              }}
              validationRules={{
                name: [validators.required],
                email: [validators.required, validators.email],
                phone: [validators.phone],
                password: [validators.required, validators.password],
                confirmPassword: [validators.required]
              }}
              onSubmit={handleFormSubmit}
            >
              <div className="space-y-6">
                <Form.Field
                  name="name"
                  label="Full Name"
                  placeholder="Enter your full name"
                  required
                  leftIcon={<User size={20} />}
                />
                
                <Form.Field
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  required
                  leftIcon={<Mail size={20} />}
                />
                
                <Form.Field
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  leftIcon={<Phone size={20} />}
                />
                
                <Form.Field
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  required
                />
                
                <Form.Field
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <Form.Actions 
                submitText="Create Account"
                loading={loading}
              />
            </Form>
          </Card>
        </div>
      </Section>

      {/* Loading States */}
      <Section>
        <h2 className="text-h2 font-semibold text-center mb-12">Loading States</h2>
        <Grid cols={2} gap="lg">
          <Card padding="lg">
            <h3 className="text-h4 font-semibold mb-6">Loading Spinners</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <LoadingSpinner size="xs" />
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" />
              </div>
              <LoadingSpinner size="md" color="secondary" text="Loading..." />
            </div>
          </Card>
          
          <Card padding="lg">
            <h3 className="text-h4 font-semibold mb-6">Skeleton Loading</h3>
            <div className="space-y-4">
              <Skeleton.Text lines={3} />
              <div className="flex items-center gap-3">
                <Skeleton.Avatar />
                <div className="flex-1">
                  <Skeleton height="h-4" width="w-1/2" className="mb-2" />
                  <Skeleton height="h-3" width="w-3/4" />
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Section>

      {/* Badges */}
      <Section background="gray">
        <h2 className="text-h2 font-semibold text-center mb-12">Badges</h2>
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </div>
      </Section>

      {/* Interactive Elements */}
      <Section>
        <h2 className="text-h2 font-semibold text-center mb-12">Interactive Elements</h2>
        <div className="text-center space-y-6">
          <div className="space-x-4">
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Button variant="secondary" onClick={showToasts}>
              Show Toasts
            </Button>
          </div>
        </div>
      </Section>

      {/* Modal Example */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-body text-gray-600 dark:text-gray-400">
            This is an example modal with proper spacing, typography, and responsive design.
            It includes backdrop blur, escape key handling, and smooth animations.
          </p>
          
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DesignSystemDemo;