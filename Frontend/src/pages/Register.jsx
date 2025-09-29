import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await registerUser(data);
      navigate('/login');
    } catch (err) {
      alert('Error en registro: ' + err.response.data.error);
    }
  };

  return (
    <div className="full-screen-center">
      <AuthForm onSubmit={handleRegister} isRegister={true} />
    </div>
  );
};

export default Register;