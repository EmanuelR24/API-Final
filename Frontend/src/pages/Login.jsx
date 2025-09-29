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
      navigate('/dashboard');
    } catch (err) {
      alert('Error en login');
    }
  };

  return (
    <div className="full-screen-center">
      <AuthForm onSubmit={handleLogin} isRegister={false} />
    </div>
  );
};

export default Login;