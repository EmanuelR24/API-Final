import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isRegister }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', rol: 'vendedor' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {isRegister && <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="form-input" />}
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="form-input" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="form-input" />
      {isRegister && (
        <select name="rol" value={formData.rol} onChange={handleChange} className="form-input">
          <option value="admin">Admin</option>
          <option value="vendedor">Vendedor</option>
        </select>
      )}
      <button type="submit" className="button-primary">{isRegister ? 'Registrar' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;