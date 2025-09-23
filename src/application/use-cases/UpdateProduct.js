/**
 * Caso de uso: Actualizar un producto.
 * 
 * @class UpdateProduct
 * 
 * @constructor
 * @param {Object} productRepository - Repositorio de productos.
 * 
 * @method execute - Actualiza datos.
 * @async
 * @param {string} id - ID del producto.
 * @param {Object} productData - Datos a actualizar.
 * @returns {Promise<Object|null>} Producto actualizado o null.
 */
export default class UpdateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, productData) {
    return await this.productRepository.update(id, productData);
  }
}