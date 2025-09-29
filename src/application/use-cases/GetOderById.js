/**
 * Caso de uso: Obtener un pedido por ID con detalles.
 * 
 * @class GetOrderById
 * 
 * @constructor
 * @param {Object} orderRepository - Repositorio de pedidos.
 * @param {Object} orderDetailRepository - Repositorio de detalles.
 * 
 * @method execute - Busca por ID e incluye detalles.
 * @async
 * @param {string} id - ID del pedido.
 * @returns {Promise<Object|null>} Pedido con detalles o null.
 */
export default class GetOrderById {
  constructor(orderRepository, orderDetailRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
  }

  async execute(id) {
    const order = await this.orderRepository.findById(id);
    if (!order) return null;
    let details = await this.orderDetailRepository.findByPedidoId(id);
    // Serializa los detalles para asegurar que _id y productoId sean string
    details = details.map(d => ({
      ...d.toObject?.() || d, // Si es Mongoose Document, usa toObject
      _id: d._id?.toString?.() || d._id,
      productoId: d.productoId?.toString?.() || d.productoId,
    }));
    order.details = details;
    console.log('Detalles encontrados para pedido', id, ':', order.details);
    return order;
  }
}