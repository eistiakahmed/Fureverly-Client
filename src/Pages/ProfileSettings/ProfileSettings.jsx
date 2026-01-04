import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Eye, 
  Globe, 
  Smartphone,
  Save,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router';
import Card from '../../Components/ui/Card';
import Button from '../../Components/ui/Button';
import Input from '../../Components/ui/Input';
import toast, { Toaster } from 'react-hot-toast';

const ProfileSettings = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    // Profile Settings
    displayName: user?.displayName || '',
    bio: 'Pet lover and enthusiast. Always looking for the best products for my furry friends.',
    location: 'New York, NY',
    website: 'https://petlover.com',
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    
    // Security Settings
    twoFactorEnabled: false,
    loginAlerts: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-[#F5B22C]' : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <Toaster position="top-center" />
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/myProfile">
            <Button variant="ghost" leftIcon={<ArrowLeft size={18} />}>
              Back to Profile
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account preferences and privacy settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card padding="md">
              <nav className="space-y-2">
                <a href="#profile" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F5B22C]/10 text-[#F5B22C] font-medium">
                  <User size={18} />
                  Profile Information
                </a>
                <a href="#privacy" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Eye size={18} />
                  Privacy
                </a>
                <a href="#notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Bell size={18} />
                  Notifications
                </a>
                <a href="#security" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Shield size={18} />
                  Security
                </a>
              </nav>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card padding="lg" id="profile">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-[#F5B22C]" size={24} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Display Name"
                  value={settings.displayName}
                  onChange={(e) => handleSettingChange('displayName', e.target.value)}
                  placeholder="Enter your display name"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={settings.bio}
                    onChange={(e) => handleSettingChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-[#F5B22C]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                
                <Input
                  label="Location"
                  value={settings.location}
                  onChange={(e) => handleSettingChange('location', e.target.value)}
                  placeholder="City, Country"
                  leftIcon={<Globe size={18} />}
                />
                
                <Input
                  label="Website"
                  type="url"
                  value={settings.website}
                  onChange={(e) => handleSettingChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  leftIcon={<Globe size={18} />}
                />
              </div>
            </Card>

            {/* Privacy Settings */}
            <Card padding="lg" id="privacy">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="text-[#F5B22C]" size={24} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Privacy Settings
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5B22C]"
                  >
                    <option value="public">Public - Anyone can see your profile</option>
                    <option value="private">Private - Only you can see your profile</option>
                    <option value="friends">Friends Only - Only friends can see your profile</option>
                  </select>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <ToggleSwitch
                    enabled={settings.showEmail}
                    onChange={(value) => handleSettingChange('showEmail', value)}
                    label="Show Email Address"
                    description="Display your email address on your public profile"
                  />
                  
                  <ToggleSwitch
                    enabled={settings.showPhone}
                    onChange={(value) => handleSettingChange('showPhone', value)}
                    label="Show Phone Number"
                    description="Display your phone number on your public profile"
                  />
                  
                  <ToggleSwitch
                    enabled={settings.allowMessages}
                    onChange={(value) => handleSettingChange('allowMessages', value)}
                    label="Allow Messages"
                    description="Allow other users to send you direct messages"
                  />
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card padding="lg" id="notifications">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-[#F5B22C]" size={24} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Notification Preferences
                </h2>
              </div>
              
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.emailNotifications}
                  onChange={(value) => handleSettingChange('emailNotifications', value)}
                  label="Email Notifications"
                  description="Receive notifications via email"
                />
                
                <ToggleSwitch
                  enabled={settings.pushNotifications}
                  onChange={(value) => handleSettingChange('pushNotifications', value)}
                  label="Push Notifications"
                  description="Receive push notifications on your device"
                />
                
                <ToggleSwitch
                  enabled={settings.marketingEmails}
                  onChange={(value) => handleSettingChange('marketingEmails', value)}
                  label="Marketing Emails"
                  description="Receive promotional emails and special offers"
                />
                
                <ToggleSwitch
                  enabled={settings.orderUpdates}
                  onChange={(value) => handleSettingChange('orderUpdates', value)}
                  label="Order Updates"
                  description="Receive notifications about your orders and purchases"
                />
              </div>
            </Card>

            {/* Security Settings */}
            <Card padding="lg" id="security">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-[#F5B22C]" size={24} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Security Settings
                </h2>
              </div>
              
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.twoFactorEnabled}
                  onChange={(value) => handleSettingChange('twoFactorEnabled', value)}
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                />
                
                <ToggleSwitch
                  enabled={settings.loginAlerts}
                  onChange={(value) => handleSettingChange('loginAlerts', value)}
                  label="Login Alerts"
                  description="Get notified when someone logs into your account"
                />
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" leftIcon={<Lock size={18} />}>
                    Change Password
                  </Button>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                loading={loading}
                leftIcon={<Save size={18} />}
                size="lg"
              >
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;