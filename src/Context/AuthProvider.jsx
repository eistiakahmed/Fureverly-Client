import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

const googleProvider = new GoogleAuthProvider();

// Use the same API URL as in profileApi.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(null)
  const [roleLoading, setRoleLoading] = useState(false)

  const createUser = (email, password) =>{ 
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email ,password)
  } 

  const signInUser = (email, password) => { 
    setLoading(true)
    return signInWithEmailAndPassword(auth, email,password)
  }
  
  const logOut = () => { 
    setLoading(true)
    setUserRole(null)
    return signOut(auth)
  }

  const googleSignIn = () => { 
    return signInWithPopup(auth, googleProvider)
  }

  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // Simple role assignment - all authenticated users are regular users
  const fetchUserRole = async (userEmail) => {
    if (!userEmail) return;
    setRoleLoading(true);
    setUserRole('user');
    setRoleLoading(false);
  };

  // Save user to backend after registration/login
  const saveUserToBackend = async (userData) => {
    try {
      const token = await userData.getIdToken();
      console.log('Saving user to backend:', userData.email);
      
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: userData.displayName || '',
          photoURL: userData.photoURL || ''
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User saved to backend successfully:', result);
      } else {
        const errorText = await response.text();
        console.error('Failed to save user to backend:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error saving user to backend:', error);
    }
  };

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      
      if (currentUser) {
        // Only fetch role, don't save user here
        // User saving will be handled manually after registration/login
        await fetchUserRole(currentUser.email);
      } else {
        setUserRole(null);
      }
      
      setLoading(false)
     })
     return () => { 
      unsubscribe()
     }
  },[])


  const authInfo = {
    createUser,
    signInUser,
    logOut,
    user,
    loading,
    googleSignIn,
    updateUserProfile,
    resetPassword,
    verifyEmail,
    userRole,
    roleLoading,
    fetchUserRole,
    saveUserToBackend,
  };



  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;