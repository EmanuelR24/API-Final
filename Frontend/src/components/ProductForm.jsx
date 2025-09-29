import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'precio' || name === 'stock') {
      newValue = value === '' ? '' : Number(value);
    }
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      precio: Number(formData.precio) || 0,
      stock: Number(formData.stock) || 0,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="form-input" />
      <input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="form-input" />
      <input name="precio" type="number" value={formData.precio} onChange={handleChange} placeholder="Precio" required className="form-input" />
      <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="form-input" />
      <input name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoría" className="form-input" />
      <button type="submit" className="button-primary">Guardar</button>
    </form>
  );
};

export default ProductForm;