import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { getProductById, updateProduct } from '../services/api';
import Navbar from '../components/Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data)).catch(() => navigate('/products'));
  }, [id]);

  const handleUpdate = async (data) => {
    await updateProduct(id, data);
    navigate('/products');
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <>
      <Navbar />
      <h1 className="text-2xl text-soft-white p-6">Editar Producto</h1> // Agrega clases
      <ProductForm initialData={product} onSubmit={handleUpdate} /> // Corrige a initialData
    </>
  );
};

export default ProductDetail;