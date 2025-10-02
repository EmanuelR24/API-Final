import React, { useState } from 'react';

const OrderForm = ({ products, onSubmit }) => {
  const [details, setDetails] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState('');
  const [localProducts, setLocalProducts] = useState(products); 

  const addItem = () => {
    if (!selectedProduct || cantidad <= 0) return;

    const product = localProducts.find(p => p._id === selectedProduct);
    if (!product) {
      setError('Producto no encontrado');
      return;
    }

    const existing = details.find(d => d.productoId === selectedProduct);
    const alreadyAdded = existing ? existing.cantidad : 0;

    if (alreadyAdded + cantidad > product.stock) {
      setError(
        `Stock insuficiente para ${product.nombre}. Máximo disponible: ${
          product.stock - alreadyAdded
        }`
      );
      return;
    }

    setLocalProducts(localProducts.map(p =>
      p._id === selectedProduct ? { ...p, stock: p.stock - cantidad } : p
    ));

    
    if (existing) {
      setDetails(details.map(d =>
        d.productoId === selectedProduct ? { ...d, cantidad: d.cantidad + cantidad } : d
      ));
    } else {
      setDetails([...details, { productoId: selectedProduct, cantidad }]);
    }

    setSelectedProduct('');
    setCantidad(1);
    setError('');
  };

  const removeItem = (index) => {
    const removed = details[index];
    if (removed) {
      setLocalProducts(localProducts.map(p =>
        p._id === removed.productoId ? { ...p, stock: p.stock + removed.cantidad } : p
      ));
    }

    setDetails(details.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.length > 0) {
      onSubmit({ details });
    } else {
      setError('Agrega al menos un producto antes de crear el pedido.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <section className="form-section">
        <h2 className="subtitle">Agregar Item</h2>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="form-input"
        >
          <option value="">Selecciona Producto</option>
          {localProducts.map(p => (  
            <option key={p._id} value={p._id}>
              {p.nombre} (Stock: {p.stock})
            </option>
          ))}
        </select>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          min="1"
          className="form-input"
        />
        <button type="button" onClick={addItem} className="button-primary">
          Agregar Item
        </button>
        {error && <p className="error-text">{error}</p>}
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
                <td>{localProducts.find(p => p._id === d.productoId)?.nombre}</td>
                <td>{d.cantidad}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="button-secondary"
                  >
                    Eliminar
                  </button>
                </td>
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
