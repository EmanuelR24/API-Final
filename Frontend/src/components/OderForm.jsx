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
    <form onSubmit={handleSubmit} className="bg-dark-bg p-6 rounded-xl max-w-md mx-auto space-y-4">
      <section>
        <h2 className="text-soft-white">Agregar Item</h2>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white">
          <option value="">Selecciona Producto</option>
          {products.map(p => <option key={p._id} value={p._id}>{p.nombre} (Stock: {p.stock})</option>)}
        </select>
        <input type="number" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} min="1" className="w-full p-2 rounded-xl border border-light-gray bg-dark-bg text-soft-white" />
        <button type="button" onClick={addItem} className="w-full p-2 bg-purple-accent text-soft-white rounded-xl hover:bg-opacity-80 transition-all duration-300">Agregar Item</button>
      </section>
      <section>
        <h2 className="text-soft-white">Items Agregados</h2>
        <table className="w-full bg-dark-bg rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-purple-accent text-soft-white">
              <th className="p-2">Producto</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d, index) => (
              <tr key={index} className="hover:bg-opacity-50 transition-all duration-300">
                <td className="p-2">{products.find(p => p._id === d.productoId)?.nombre}</td>
                <td className="p-2">{d.cantidad}</td>
                <td className="p-2"><button type="button" onClick={() => removeItem(index)} className="bg-purple-accent text-soft-white p-1 rounded-xl hover:bg-opacity-80 transition-all duration-300">Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <button type="submit" className="w-full p-2 bg-purple-accent text-soft-white rounded-xl hover:bg-opacity-80 transition-all duration-300">Crear Pedido</button>
    </form>
  );
};

export default OrderForm;