/**
 * Repositorio de detalles de pedidos usando MongoDB.
 * 
 * @class OrderDetailRepositoryMongo
 * 
 * @method create - Crea un detalle.
 * @method findByPedidoId - Obtiene detalles por pedidoId.
 * @method findAll - Obtiene todos (no usado).
 * @method findById - Busca por ID (no usado).
 * @method update - Actualiza (no usado).
 * @method delete - Elimina (no usado).
 */
import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema({
  pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  cantidad: Number,
  precioUnitario: Number,
  subtotal: Number
});

const OrderDetailModel = mongoose.model("OrderDetail", OrderDetailSchema);

class OrderDetailRepositoryMongo {
  async create(detailData) {
    const detail = new OrderDetailModel(detailData);
    return await detail.save();
  }

  async findAll() {
    return await OrderDetailModel.find();
  }

  async findById(id) {
    return await OrderDetailModel.findById(id);
  }

  async findByPedidoId(pedidoId) {
    return await OrderDetailModel.find({ pedidoId });
  }

  async update(id, detailData) {
    return await OrderDetailModel.findByIdAndUpdate(id, detailData, { new: true });
  }

  async delete(id) {
    return await OrderDetailModel.findByIdAndDelete(id);
  }
}

export default OrderDetailRepositoryMongo;