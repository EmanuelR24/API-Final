/**
 * Repositorio de productos usando MongoDB.
 * 
 * @class ProductRepositoryMongo
 * 
 * @method create - Crea un producto.
 * @method findAll - Obtiene todos.
 * @method findById - Busca por ID.
 * @method update - Actualiza.
 * @method delete - Elimina.
 */
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
  categoria: String,
  createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model("Product", ProductSchema);

class ProductRepositoryMongo {
  async create(productData) {
    const product = new ProductModel(productData);
    return await product.save();
  }

  async findAll() {
    return await ProductModel.find();
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async update(id, productData) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default ProductRepositoryMongo;