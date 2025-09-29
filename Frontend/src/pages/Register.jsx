import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import AuthFormRegister from '../components/AuthFormRegister.jsx';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (data) => {
    setError('');
    try {
      await registerUser(data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Error en registro');
    }
  };

  return (
    <div className="full-screen-center">
      <div>
        <AuthFormRegister onSubmit={handleRegister} />
        {error && <p className="loading-text">{error}</p>}
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          ¿Ya tienes cuenta?{' '}
          <span
            style={{ color: '#7c3aed', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/login')}
          >
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;