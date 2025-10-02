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
    // Los detalles ya incluyen el producto populado
    const details = await this.orderDetailRepository.findByPedidoId(id);
    order.details = Array.isArray(details) ? details : [];
    return order;
  }
}

