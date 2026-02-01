import React, { use, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

const useAxios = () => {
  const { user } = use(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    // intercept request
    const reqInterceptor = axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);

        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          navigate('/');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, navigate]);
  return axiosInstance;
};

export default useAxios;
