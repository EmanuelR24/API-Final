import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/api';
import Navbar from '../components/Navbar'; // Asumiendo que quieres Navbar aquí

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
    <div className="min-h-screen p-6">
      <header><Navbar /></header>
      <main>
        <AuthForm onSubmit={handleRegister} isRegister={true} />
      </main>
    </div>
  );
};

export default Register;