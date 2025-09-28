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
    console.log('Datos enviados al crear/actualizar:', submitData);
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="dark-bg p-6 rounded-xl max-w-md mx-auto space-y-4">
      <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />
      <input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />
      <input name="precio" type="number" value={formData.precio} onChange={handleChange} placeholder="Precio" required className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />
      <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />
      <input name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoría" className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />
      <button type="submit" className="w-full p-2 purple-accent-bg soft-white-text rounded-xl hover-opacity-80 transition-all">Guardar</button>
    </form>
  );
};

export default ProductForm;