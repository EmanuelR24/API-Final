/**
 * Repositorio de pedidos usando MongoDB.
 * 
 * @class OrderRepositoryMongo
 * 
 * @method create - Crea un pedido.
 * @method findAll - Obtiene todos.
 * @method findById - Busca por ID.
 * @method update - Actualiza.
 * @method delete - Elimina (no usado, pero incluido).
 */
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  total: Number,
  estado: { type: String, enum: ["activo", "cancelado"], default: "activo" },
  createdAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model("Order", OrderSchema);

class OrderRepositoryMongo {
  async create(orderData) {
    const order = new OrderModel(orderData);
    return await order.save();
  }

  async findAll() {
    return await OrderModel.find();
  }

  async findById(id) {
    return await OrderModel.findById(id);
  }

  async update(id, orderData) {
    return await OrderModel.findByIdAndUpdate(id, orderData, { new: true });
  }

  async delete(id) {
    return await OrderModel.findByIdAndDelete(id);
  }
}

export default OrderRepositoryMongo;