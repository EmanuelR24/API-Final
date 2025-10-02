/**
 * Caso de uso: Crear un nuevo pedido con detalles.
 * 
 * @class CreateOrder
 * 
 * @constructor
 * @param {Object} orderRepository - Repositorio de pedidos.
 * @param {Object} orderDetailRepository - Repositorio de detalles.
 * @param {Object} productRepository - Repositorio de productos.
 * 
 * @method execute - Crea pedido, verifica y descuenta stock, calcula totales.
 * @async
 * @param {Object} orderData - Datos: usuarioId, details: [{productoId, cantidad}].
 * @returns {Promise<Object>} Pedido creado.
 */
export default class CreateOrder {
  constructor(orderRepository, orderDetailRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
  }

  async execute(orderData) {
    let total = 0;
    const details = [];

    // Validar que haya al menos un producto
    if (!orderData.details || !Array.isArray(orderData.details) || orderData.details.length === 0) {
      throw new Error("El pedido debe tener al menos un producto");
    }

    // Calcular totales y descontar stock
    for (const item of orderData.details) {
      const product = await this.productRepository.findById(item.productoId);
      if (!product || product.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para producto ${item.productoId}`);
      }
      const subtotal = item.cantidad * product.precio;
      total += subtotal;
      details.push({
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario: product.precio,
        subtotal
      });
      product.stock -= item.cantidad;
      await this.productRepository.update(product._id, { stock: product.stock });
    }

    // Crear el pedido (solo uno)
    const order = await this.orderRepository.create({
      usuarioId: orderData.usuarioId,
      total,
      estado: "activo"
    });

    console.log("Pedido creado:", order);

    // Crear los detalles asociados al pedido
    for (const detail of details) {
      detail.pedidoId = order._id;
      console.log("Detalle a guardar:", detail);
      await this.orderDetailRepository.create(detail);
    }

    // Retornar el pedido con los detalles
    order.details = details;
    return order;
  }
}