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

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-bg p-6 rounded-xl max-w-md mx-auto space-y-4">
      <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />
      <input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />
      <input name="precio" type="number" value={formData.precio} onChange={handleChange} placeholder="Precio" required className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />
      <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />
      <input name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoría" className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />
      <button type="submit" className="w-full p-2 bg-purple-accent text-soft-white rounded-xl hover:bg-opacity-80 transition-all duration-300">Guardar</button>
    </form>
  );
};

export default ProductForm;