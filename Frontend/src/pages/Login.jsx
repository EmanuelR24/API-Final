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
      <div>
        <AuthForm onSubmit={handleLogin} />
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          ¿No tienes cuenta?{' '}
          <span
            style={{ color: '#7c3aed', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;