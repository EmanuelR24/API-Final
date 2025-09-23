/**
 * Caso de uso: Autenticar usuario (login).
 * 
 * @class AuthenticateUser
 * 
 * @constructor
 * @param {Object} userRepository - Repositorio de usuarios.
 * 
 * @method execute - Verifica credenciales y genera JWT.
 * @async
 * @param {Object} credentials - Email y password.
 * @returns {Promise<string>} Token JWT.
 */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class AuthenticateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }
    return jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });
  }
}