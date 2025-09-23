/**
 * Controladores para autenticación.
 * 
 * @function register - Registra usuario.
 * @function login - Inicia sesión.
 */
import CreateUser from "../../application/use-cases/CreateUser.js";
import AuthenticateUser from "../../application/use-cases/AuthenticateUser.js";
import UserRepositoryMongo from "../../infrastructure/repositories/UserRepositoryMongo.js";

const userRepository = new UserRepositoryMongo();

export const register = async (req, res) => {
  try {
    const createUser = new CreateUser(userRepository);
    const user = await createUser.execute(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const authenticateUser = new AuthenticateUser(userRepository);
    const token = await authenticateUser.execute(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};