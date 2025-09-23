/**
 * Controladores para productos.
 * 
 * @function createProduct - Crea.
 * @function getProducts - Lista todos.
 * @function getProductById - Obtiene por ID.
 * @function updateProduct - Actualiza.
 * @function deleteProduct - Elimina.
 */
import CreateProduct from "../../application/use-cases/CreateProduct.js";
import GetProducts from "../../application/use-cases/GetProducts.js";
import GetProductById from "../../application/use-cases/GetProductById.js";
import UpdateProduct from "../../application/use-cases/UpdateProduct.js";
import DeleteProduct from "../../application/use-cases/DeleteProduct.js";
import ProductRepositoryMongo from "../../infrastructure/repositories/ProductRepositoryMongo.js";

const productRepository = new ProductRepositoryMongo();

export const createProduct = async (req, res) => {
  try {
    const createProductUseCase = new CreateProduct(productRepository);
    const product = await createProductUseCase.execute(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const getProductsUseCase = new GetProducts(productRepository);
    const products = await getProductsUseCase.execute();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const getProductByIdUseCase = new GetProductById(productRepository);
    const product = await getProductByIdUseCase.execute(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updateProductUseCase = new UpdateProduct(productRepository);
    const product = await updateProductUseCase.execute(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleteProductUseCase = new DeleteProduct(productRepository);
    const result = await deleteProductUseCase.execute(req.params.id);
    if (!result) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};