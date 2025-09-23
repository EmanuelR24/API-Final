/**
 * Entidad de dominio: Pedido (Encabezado).
 * 
 * @class Order
 * 
 * @constructor
 * @param {Object} params - Parámetros del pedido.
 * @param {string} params.id - Identificador único.
 * @param {string} params.usuarioId - ID del usuario.
 * @param {number} params.total - Total del pedido.
 * @param {string} params.estado - Estado (activo o cancelado).
 * @param {Date} params.createdAt - Fecha de creación.
 */
class Order {
  constructor({ id, usuarioId, total, estado, createdAt }) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.total = total;
    this.estado = estado;
    this.createdAt = createdAt;
  }
}

export default Order;