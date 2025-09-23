/**
 * Caso de uso: Eliminar un producto.
 * 
 * @class DeleteProduct
 * 
 * @constructor
 * @param {Object} productRepository - Repositorio de productos.
 * 
 * @method execute - Elimina por ID.
 * @async
 * @param {string} id - ID del producto.
 * @returns {Promise<Object|null>} Resultado de eliminación.
 */
export default class DeleteProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    return await this.productRepository.delete(id);
  }
}