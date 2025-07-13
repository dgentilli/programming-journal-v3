import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginSignupUI from './LoginSignupUI';
import axios from 'axios';
import { useUserActions } from '../../globalState/userStore';

const MemoizedLoginSignupUI = React.memo(LoginSignupUI);

export type FormData = {
  email: string;
  password: string;
  shouldCreateNewAccount: boolean;
};

const LoginSignupContainer = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    shouldCreateNewAccount: false,
  });
  const [error, setError] = useState('');
  const { setUser } = useUserActions();
  const navigate = useNavigate();

  const handleSignup = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/author/signup',
          { email, password }
        );
        console.log('response.data from signup', response?.data);
        navigate('/');
        const { data } = response || {};
        const { success } = data;
        if (!success) {
          return setError('Signup Failed');
        } else {
          const data = await handleLogin(email, password);
          setUser(data);
          navigate('/');
          return data;
        }
      } catch (error) {
        console.log('error when signing up:', error);
      }
    },
    // ignore exhaustive deps here
    [navigate, setUser]
  );

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/author/login',
          { email, password }
        );
        console.log('response.data from login', response?.data);
        const { data } = response || {};
        const { success } = data;

        if (!success) {
          return setError('Login Failed');
        } else {
          setUser(data);
          navigate('/');
          return data;
        }
      } catch (error) {
        console.log('error when logging in:', error);
        setError('Login Failed');
      }
    },
    [navigate, setUser]
  );

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('formData recd', formData);
    const { email, password, shouldCreateNewAccount } = formData;

    return shouldCreateNewAccount
      ? handleSignup(email, password)
      : handleLogin(email, password);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  return (
    <MemoizedLoginSignupUI
      formData={formData}
      error={error}
      handleChange={handleChange}
      handleFormSubmission={handleFormSubmission}
    />
  );
};

export default LoginSignupContainer;
