/**
 * Controladores para pedidos.
 * 
 * @function createOrder - Crea con detalles.
 * @function getOrders - Lista todos.
 * @function getOrderById - Obtiene por ID con detalles.
 * @function cancelOrder - Cancela.
 */
import CreateOrder from "../../application/use-cases/CreateOrder.js";
import GetOrders from "../../application/use-cases/GetOrders.js";
import GetOrderById from "../../application/use-cases/GetOrderById.js";  // Corregido: Agregada la 'r' en GetOrderById.js
import CancelOrder from "../../application/use-cases/CancelOrder.js";
import OrderRepositoryMongo from "../../infrastructure/repositories/OrderRepositoryMongo.js";
import OrderDetailRepositoryMongo from "../../infrastructure/repositories/OrderDetailRepositoryMongo.js";
import ProductRepositoryMongo from "../../infrastructure/repositories/ProductRepositoryMongo.js";

const orderRepository = new OrderRepositoryMongo();
const orderDetailRepository = new OrderDetailRepositoryMongo();
const productRepository = new ProductRepositoryMongo();

export const createOrder = async (req, res) => {
  try {
    const createOrderUseCase = new CreateOrder(orderRepository, orderDetailRepository, productRepository);
    const order = await createOrderUseCase.execute({ ...req.body, usuarioId: req.user.id });  // Usa ID de usuario autenticado
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const getOrdersUseCase = new GetOrders(orderRepository);
    const orders = await getOrdersUseCase.execute();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const getOrderByIdUseCase = new GetOrderById(orderRepository, orderDetailRepository);
    const order = await getOrderByIdUseCase.execute(req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(order);  // Ahora debería incluir order.details si existen en la DB
  } catch (err) {
    console.error('Error en getOrderById:', err);  // Agregado: Log para depuración
    res.status(500).json({ error: err.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const cancelOrderUseCase = new CancelOrder(orderRepository, orderDetailRepository, productRepository);
    const order = await cancelOrderUseCase.execute(req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};