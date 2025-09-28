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

  if (!product) return <div className="soft-white-text">Cargando...</div>;

  return (
    <>
      <Navbar />
      <h1 className="text-2xl soft-white-text p-6">Editar Producto</h1>
      <ProductForm initialData={product} onSubmit={handleUpdate} />
    </>
  );
};

export default ProductDetail;