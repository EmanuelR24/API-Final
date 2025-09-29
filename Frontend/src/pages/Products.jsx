import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import { getProducts, createProduct, deleteProduct } from '../services/api';
import Navbar from '../components/Navbar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(res => setProducts(res.data)).catch(() => navigate('/login'));
  }, []);

  const handleCreate = async (data) => {
    await createProduct(data);
    setShowForm(false);
    const res = await getProducts();
    setProducts(res.data);
  };
  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p._id !== id));
  };

  const handleEdit = (id) => navigate(`/products/${id}`);

  return (
    <div className="container">
      <Navbar />
      <h1 className="title">Productos</h1>
      <button onClick={() => setShowForm(true)} className="button-primary">Nuevo Producto</button>
      {showForm && <ProductForm onSubmit={handleCreate} />}
      <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Products;