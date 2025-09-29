import React, { useState } from 'react';

const OrderForm = ({ products, onSubmit }) => {
  const [details, setDetails] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const addItem = () => {
    if (selectedProduct && cantidad > 0) {
      setDetails([...details, { productoId: selectedProduct, cantidad }]);
      setSelectedProduct('');
      setCantidad(1);
    }
  };

  const removeItem = (index) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.length > 0) {
      onSubmit({ details });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <section className="form-section">
        <h2 className="subtitle">Agregar Item</h2>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="form-input">
          <option value="">Selecciona Producto</option>
          {products.map(p => <option key={p._id} value={p._id}>{p.nombre} (Stock: {p.stock})</option>)}
        </select>
        <input type="number" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} min="1" className="form-input" />
        <button type="button" onClick={addItem} className="button-primary">Agregar Item</button>
      </section>
      <section className="form-section">
        <h2 className="subtitle">Items Agregados</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d, index) => (
              <tr key={index}>
                <td>{products.find(p => p._id === d.productoId)?.nombre}</td>
                <td>{d.cantidad}</td>
                <td><button type="button" onClick={() => removeItem(index)} className="button-secondary">Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <button type="submit" className="button-primary">Crear Pedido</button>
    </form>
  );
};

export default OrderForm;