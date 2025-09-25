import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: '',
    ...initialData
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input name="precio" type="number" value={formData.precio} onChange={handleChange} placeholder="Precio" required />
      <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
      <input name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoría" />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;