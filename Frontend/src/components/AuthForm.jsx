import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isRegister }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', rol: 'vendedor' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="dark-bg p-6 rounded-xl max-w-md mx-auto space-y-4">
      {isRegister && <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />}
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />
      {isRegister && (
        <select name="rol" value={formData.rol} onChange={handleChange} className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text">
          <option value="admin">Admin</option>
          <option value="vendedor">Vendedor</option>
        </select>
      )}
      <button type="submit" className="w-full p-2 purple-accent-bg soft-white-text rounded-xl hover-opacity-80 transition-all">{isRegister ? 'Registrar' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;