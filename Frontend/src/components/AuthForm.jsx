import React, { useState } from 'react';

const AuthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="form-input-lg" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="form-input-lg" />
      <button type="submit" className="button-primary">Login</button>
    </form>
  );
};

export default AuthForm;