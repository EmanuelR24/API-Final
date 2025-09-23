/**
 * Caso de uso: Crear un nuevo producto.
 * 
 * @class CreateProduct
 * 
 * @constructor
 * @param {Object} productRepository - Repositorio de productos.
 * 
 * @method execute - Crea el producto.
 * @async
 * @param {Object} productData - Datos del producto.
 * @returns {Promise<Object>} Producto creado.
 */
export default class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    return await this.productRepository.create(productData);
  }
}