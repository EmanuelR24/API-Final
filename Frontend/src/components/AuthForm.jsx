import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isRegister }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', rol: 'vendedor' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-bg p-6 rounded-xl max-w-md mx-auto space-y-4">
      {isRegister && <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />}
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />
      {isRegister && (
        <select name="rol" value={formData.rol} onChange={handleChange} className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white">
          <option value="admin">Admin</option>
          <option value="vendedor">Vendedor</option>
        </select>
      )}
      <button type="submit" className="w-full p-2 bg-purple-accent text-soft-white rounded-xl hover:bg-opacity-80 transition-all duration-300">{isRegister ? 'Registrar' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;