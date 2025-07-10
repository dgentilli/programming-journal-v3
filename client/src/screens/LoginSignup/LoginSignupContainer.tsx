import React, { useCallback, useState } from 'react';
import LoginSignupUI from './LoginSignupUI';
import axios from 'axios';

const MemoizedLoginSignupUI = React.memo(LoginSignupUI);

export type FormData = {
  email: string;
  password: string;
  shouldCreateNewAccount: boolean;
};

const handleSignup = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/author/signup',
      { email, password }
    );
    console.log('response.data from signup', response?.data);
    return response?.data;
  } catch (error) {
    console.log('error when signing up:', error);
  }
};

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/author/login',
      { email, password }
    );
    console.log('response.data from login', response?.data);
    return response?.data;
  } catch (error) {
    console.log('error when logging in:', error);
  }
};

const LoginSignupContainer = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    shouldCreateNewAccount: false,
  });

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
      handleChange={handleChange}
      handleFormSubmission={handleFormSubmission}
    />
  );
};

export default LoginSignupContainer;
