import React from 'react';
import { toast as hotToast } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

// Custom toast component
const CustomToast = ({ type, message, onDismiss }) => {
  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
    warning: <AlertCircle className="text-yellow-500" size={20} />
  };

  const backgrounds = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
  };

  return (
    <div className={`
      flex items-center gap-3 p-4 rounded-lg border shadow-lg
      ${backgrounds[type]}
      text-gray-900 dark:text-white
      max-w-md w-full
    `}>
      {icons[type]}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// Toast utility functions
export const toast = {
  success: (message, options = {}) => {
    return hotToast.custom(
      (t) => (
        <CustomToast
          type="success"
          message={message}
          onDismiss={() => hotToast.dismiss(t.id)}
        />
      ),
      {
        duration: 4000,
        position: 'top-center',
        ...options
      }
    );
  },

  error: (message, options = {}) => {
    return hotToast.custom(
      (t) => (
        <CustomToast
          type="error"
          message={message}
          onDismiss={() => hotToast.dismiss(t.id)}
        />
      ),
      {
        duration: 5000,
        position: 'top-center',
        ...options
      }
    );
  },

  info: (message, options = {}) => {
    return hotToast.custom(
      (t) => (
        <CustomToast
          type="info"
          message={message}
          onDismiss={() => hotToast.dismiss(t.id)}
        />
      ),
      {
        duration: 4000,
        position: 'top-center',
        ...options
      }
    );
  },

  warning: (message, options = {}) => {
    return hotToast.custom(
      (t) => (
        <CustomToast
          type="warning"
          message={message}
          onDismiss={() => hotToast.dismiss(t.id)}
        />
      ),
      {
        duration: 4000,
        position: 'top-center',
        ...options
      }
    );
  },

  loading: (message, options = {}) => {
    return hotToast.loading(message, {
      position: 'top-center',
      ...options
    });
  },

  dismiss: (toastId) => {
    hotToast.dismiss(toastId);
  },

  promise: (promise, messages, options = {}) => {
    return hotToast.promise(
      promise,
      {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong'
      },
      {
        position: 'top-center',
        ...options
      }
    );
  }
};

export default toast;