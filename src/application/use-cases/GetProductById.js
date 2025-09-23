/**
 * Caso de uso: Obtener un producto por ID.
 * 
 * @class GetProductById
 * 
 * @constructor
 * @param {Object} productRepository - Repositorio de productos.
 * 
 * @method execute - Busca por ID.
 * @async
 * @param {string} id - ID del producto.
 * @returns {Promise<Object|null>} Producto o null.
 */
export default class GetProductById {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    return await this.productRepository.findById(id);
  }
}