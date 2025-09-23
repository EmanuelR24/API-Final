/**
 * Entidad de dominio: Producto.
 * 
 * @class Product
 * 
 * @constructor
 * @param {Object} params - Parámetros del producto.
 * @param {string} params.id - Identificador único.
 * @param {string} params.nombre - Nombre del producto.
 * @param {string} params.descripcion - Descripción.
 * @param {number} params.precio - Precio decimal.
 * @param {number} params.stock - Stock entero.
 * @param {string} params.categoria - Categoría.
 * @param {Date} params.createdAt - Fecha de creación.
 */
class Product {
  constructor({ id, nombre, descripcion, precio, stock, categoria, createdAt }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.createdAt = createdAt;
  }
}

export default Product;