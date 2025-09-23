/**
 * Caso de uso: Crear un nuevo usuario (registro).
 * 
 * @class CreateUser
 * 
 * @constructor
 * @param {Object} userRepository - Repositorio de usuarios.
 * 
 * @method execute - Crea el usuario, hashea contraseña, verifica email único.
 * @async
 * @param {Object} userData - Datos del usuario.
 * @returns {Promise<Object>} Usuario creado.
 */
import bcrypt from "bcryptjs";

export default class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email duplicado");
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    return await this.userRepository.create(userData);
  }
}