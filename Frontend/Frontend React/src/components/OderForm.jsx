import React, { useState } from 'react';

const OrderForm = ({ products, onSubmit }) => {
  const [details, setDetails] = useState([]);

  const addDetail = (productoId, cantidad) => {
    setDetails([...details, { productoId, cantidad }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ details });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Selector de productos y cantidad */}
      <select onChange={(e) => {/* lógica para agregar */}}>
        {products.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
      </select>
      <input type="number" placeholder="Cantidad" />
      <button type="button" onClick={() => {/* addDetail */}}>Agregar Item</button>
      <button type="submit">Crear Pedido</button>
    </form>
  );
};

export default OrderForm;