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
    <form onSubmit={handleSubmit} className="dark-bg p-6 rounded-xl max-w-md mx-auto space-y-4">
      <section>
        <h2 className="soft-white-text">Agregar Item</h2>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text">
          <option value="">Selecciona Producto</option>
          {products.map(p => <option key={p._id} value={p._id}>{p.nombre} (Stock: {p.stock})</option>)}
        </select>
        <input type="number" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} min="1" className="w-full p-2 rounded-xl light-gray-border dark-bg soft-white-text" />
        <button type="button" onClick={addItem} className="w-full p-2 purple-accent-bg soft-white-text rounded-xl hover-opacity-80 transition-all">Agregar Item</button>
      </section>
      <section>
        <h2 className="soft-white-text">Items Agregados</h2>
        <table className="w-full dark-bg rounded-xl overflow-hidden">
          <thead>
            <tr className="purple-accent-bg soft-white-text">
              <th className="p-2">Producto</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d, index) => (
              <tr key={index} className="hover-bg-opacity-50 transition-all">
                <td className="p-2">{products.find(p => p._id === d.productoId)?.nombre}</td>
                <td className="p-2">{d.cantidad}</td>
                <td className="p-2"><button type="button" onClick={() => removeItem(index)} className="purple-accent-bg soft-white-text p-1 rounded-xl hover-opacity-80 transition-all">Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <button type="submit" className="w-full p-2 purple-accent-bg soft-white-text rounded-xl hover-opacity-80 transition-all">Crear Pedido</button>
    </form>
  );
};

export default OrderForm;