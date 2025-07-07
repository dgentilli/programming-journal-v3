import React, { useCallback, useState } from 'react';
import LoginSignupUI from './LoginSignupUI';

const MemoizedLoginSignupUI = React.memo(LoginSignupUI);

const LoginSignupContainer = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return (
    <MemoizedLoginSignupUI formData={formData} handleChange={handleChange} />
  );
};

export default LoginSignupContainer;
