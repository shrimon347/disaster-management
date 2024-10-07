import React, { createContext, useContext, useState, useEffect } from 'react';
import apiPublic from "../utility/Api"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state for auth operations

  // Check if user is already logged in (using localStorage tokens)
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');

    if (accessToken && userData) {
      setUser(JSON.parse(userData)); // Set user if already logged in
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await apiPublic.post('user/login/', { email, password }); // API call to login

      const { token, user } = response.data; // Extract tokens and user data
      console.log(response.data);
      

      // Store tokens in localStorage
      localStorage.setItem('access_token', token.access);
      localStorage.setItem('refresh_token', token.refresh);

      // Store user data
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
        age: user.age,
      };
      setUser(userData);
      localStorage.setItem('user_data', JSON.stringify(userData)); // Persist user data in localStorage

      return response.data.msg; // Return success message
    } catch (error) {
      console.log(error);
      
    }
  };

// Register function
const register = async (userData) => {
  try {
    // API call to register user
    const response = await apiPublic.post('user/register/', userData);

    const { token } = response.data; // Extract tokens from response

    // Store tokens in localStorage
    localStorage.setItem('access_token', token.access);
    localStorage.setItem('refresh_token', token.refresh);

    // Set user data after registration
    const newUser = {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      age: userData.age || null,
      mobile_number: userData.mobile_number || '',
      location: userData.location || '',
      assigned_task: userData.assigned_task || '',
    };

    setUser(newUser);
    localStorage.setItem('user_data', JSON.stringify(newUser));

    return response.data.msg; 
  } catch (error) {
  
    const errorMessage =
      error.response?.data?.detail || 'Registration failed. Please try again.';
    throw new Error(errorMessage);
  }
};


  // Update Profile function
  const updateProfile = async (profileData) => {
    try {
      const response = await apiPublic.put('user/profile/', profileData); // API call to update profile
      return response.data.msg; // Return success message
    } catch (error) {
      throw new Error('Profile update failed');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  };

  // Provide auth context value
  const authInfo = {
    user,
    login,
    register,
    updateProfile,
    logout,
    isAuthenticated: !!user, // Check if the user is authenticated
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
