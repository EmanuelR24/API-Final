/**
 * Entidad de dominio: Detalle de Pedido.
 * 
 * @class OrderDetail
 * 
 * @constructor
 * @param {Object} params - Parámetros del detalle.
 * @param {string} params.id - Identificador único.
 * @param {string} params.pedidoId - ID del pedido.
 * @param {string} params.productoId - ID del producto.
 * @param {number} params.cantidad - Cantidad.
 * @param {number} params.precioUnitario - Precio unitario.
 * @param {number} params.subtotal - Subtotal (cantidad * precioUnitario).
 */
class OrderDetail {
  constructor({ id, pedidoId, productoId, cantidad, precioUnitario, subtotal }) {
    this.id = id;
    this.pedidoId = pedidoId;
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.subtotal = subtotal;
  }
}

export default OrderDetail;