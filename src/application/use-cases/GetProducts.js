/**
 * Caso de uso: Obtener todos los productos.
 * 
 * @class GetProducts
 * 
 * @constructor
 * @param {Object} productRepository - Repositorio de productos.
 * 
 * @method execute - Obtiene la lista.
 * @async
 * @returns {Promise<Array<Object>>} Lista de productos.
 */
export default class GetProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    return await this.productRepository.findAll();
  }
}