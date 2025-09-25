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
    <div className="min-h-screen p-6">
      <Navbar />
      <h1>Editar Producto</h1>
      <ProductForm onSubmit={handleUpdate} initialData={product} />
    </div>
  );
};

export default ProductDetail;