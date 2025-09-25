import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem('token', res.data.token);
      navigate('/products');
    } catch (err) {
      alert('Error en login');
    }
  };

  return <AuthForm onSubmit={handleLogin} isRegister={false} />;
};

export default Login;