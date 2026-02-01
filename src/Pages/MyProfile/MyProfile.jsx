import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Mail, 
  CalendarDays, 
  User, 
  Edit3, 
  Loader2, 
  Camera, 
  Shield, 
  Settings, 
  Activity,
  MapPin,
  Phone,
  Globe,
  CheckCircle,
  Star
} from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router';
import Card from '../../Components/ui/Card';
import Button from '../../Components/ui/Button';
import Input from '../../Components/ui/Input';
import Modal from '../../Components/ui/Modal';
import { ProfileCard, ProfileStats } from '../../Components/profile';
import { profileApi, calculateProfileCompletion, transformUserProfile } from '../../utils/profileApi';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Profile data from backend
  const [profileData, setProfileData] = useState({
    bio: '',
    location: '',
    phone: '',
    website: '',
    joinDate: new Date(),
    isVerified: false,
    profileCompletion: 0
  });

  // Stats data from backend
  const [statsData, setStatsData] = useState({
    totalListings: 0,
    totalOrders: 0,
    totalFavorites: 0,
    averageRating: 0,
    totalViews: 0,
    totalFollowers: 0
  });

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setProfileLoading(true);
        
        // Fetch user profile from your backend
        const backendProfile = await profileApi.getProfile();
        const transformedProfile = transformUserProfile(backendProfile);
        
        // Calculate profile completion
        const completion = calculateProfileCompletion(user, transformedProfile);
        transformedProfile.profileCompletion = completion;
        
        setProfileData(transformedProfile);
        
        // Fetch user stats
        const stats = await profileApi.getUserStats();
        setStatsData(stats);
        
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        
        // Fallback to basic profile data from Firebase user
        const fallbackProfile = {
          bio: '',
          location: '',
          phone: '',
          website: '',
          joinDate: user?.metadata?.creationTime ? new Date(user.metadata.creationTime) : new Date(),
          isVerified: false,
          profileCompletion: calculateProfileCompletion(user, {})
        };
        
        setProfileData(fallbackProfile);
        
        // Show a user-friendly message instead of error
        toast.error('Unable to load profile data. Using basic information.');
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error('Name cannot be empty!');
      return;
    }

    try {
      setLoading(true);
      
      // Update Firebase profile first (this is more reliable)
      await updateProfile(user, { displayName, photoURL });
      
      // Try to update backend profile
      try {
        await profileApi.updateProfile({
          name: displayName,
          profileImage: photoURL
        });
        
        // Refresh profile data from backend
        const backendProfile = await profileApi.getProfile();
        const transformedProfile = transformUserProfile(backendProfile);
        const completion = calculateProfileCompletion(user, transformedProfile);
        transformedProfile.profileCompletion = completion;
        setProfileData(transformedProfile);
        
      } catch (backendError) {
        console.error('Backend update failed:', backendError);
        // Firebase update succeeded, so we can still show success
        // but note that backend sync failed
        toast.success('Profile updated! (Some features may be limited)');
      }
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const getProfileCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <Toaster position="top-center" />
      
      {profileLoading ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="animate-spin text-[#F5B22C]" size={48} />
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Overview Card */}
          <ProfileCard
            user={user}
            profileData={profileData}
            onEditClick={() => setIsEditing(true)}
            className="shadow-lg"
          />

          {/* Profile Statistics */}
          <ProfileStats stats={statsData} />

          {/* Contact & Account Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card padding="lg" shadow="md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User size={20} />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Mail className="text-[#F5B22C]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.email || 'No email available'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Phone className="text-[#F5B22C]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {profileData.phone || 'Not provided'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Globe className="text-[#F5B22C]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {profileData.website || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Information */}
            <Card padding="lg" shadow="md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={20} />
                Account Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CalendarDays className="text-[#F5B22C]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {profileData.joinDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <User className="text-[#F5B22C]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                    <p className="font-medium text-gray-900 dark:text-white font-mono text-sm">
                      {user?.uid?.substring(0, 8) || 'N/A'}...
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="text-[#F5B22C]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verification Status</p>
                    <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {profileData.isVerified ? (
                        <>
                          <CheckCircle className="text-green-500" size={16} />
                          Verified Account
                        </>
                      ) : (
                        <>
                          <span className="text-yellow-500">Pending Verification</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="lg" hover className="text-center">
              <Activity className="text-[#F5B22C] mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Activity
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                View your recent activity and interactions
              </p>
              <Button variant="outline" size="sm" fullWidth>
                View Activity
              </Button>
            </Card>

            <Card padding="lg" hover className="text-center">
              <Settings className="text-[#F5B22C] mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Manage your account preferences and privacy
              </p>
              <Link to="/profile-settings">
                <Button variant="outline" size="sm" fullWidth>
                  Open Settings
                </Button>
              </Link>
            </Card>

            <Card padding="lg" hover className="text-center">
              <Star className="text-[#F5B22C] mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Favorites
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Access your saved items and favorites
              </p>
              <Button variant="outline" size="sm" fullWidth>
                View Favorites
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Profile"
        size="md"
      >
        <form onSubmit={handleUpdate} className="space-y-6">
          <Input
            label="Display Name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your display name"
            required
            leftIcon={<User size={18} />}
          />

          <Input
            label="Profile Photo URL"
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            leftIcon={<Camera size={18} />}
            helperText="Enter a valid URL for your profile picture"
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              leftIcon={loading ? <Loader2 className="animate-spin" size={18} /> : <Edit3 size={18} />}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyProfile;
