/**
 * Caso de uso: Obtener todos los pedidos.
 * 
 * @class GetOrders
 * 
 * @constructor
 * @param {Object} orderRepository - Repositorio de pedidos.
 * 
 * @method execute - Obtiene la lista.
 * @async
 * @returns {Promise<Array<Object>>} Lista de pedidos.
 */
export default class GetOrders {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    return await this.orderRepository.findAll();
  }
}