/**
 * Caso de uso: Cancelar un pedido.
 * 
 * @class CancelOrder
 * 
 * @constructor
 * @param {Object} orderRepository - Repositorio de pedidos.
 * @param {Object} orderDetailRepository - Repositorio de detalles.
 * @param {Object} productRepository - Repositorio de productos.
 * 
 * @method execute - Cambia estado a cancelado y devuelve stock.
 * @async
 * @param {string} id - ID del pedido.
 * @returns {Promise<Object|null>} Pedido cancelado.
 */
export default class CancelOrder {
  constructor(orderRepository, orderDetailRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
  }

  async execute(id) {
    const order = await this.orderRepository.findById(id);
    if (!order || order.estado === "cancelado") {
      throw new Error("Pedido no válido para cancelar");
    }
    const details = await this.orderDetailRepository.findByPedidoId(id);
    for (const detail of details) {
      const product = await this.productRepository.findById(detail.productoId);
      if (!product) {
        console.error(`Producto no encontrado para el detalle: ${detail._id}, productoId: ${detail.productoId}`);
        continue;
      }
      product.stock += detail.cantidad;
      await this.productRepository.update(product._id, { stock: product.stock });
    }
    return await this.orderRepository.update(id, { estado: "cancelado" });
  }
}