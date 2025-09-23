/**
 * Entidad de dominio: Usuario.
 * 
 * @class User
 * 
 * @constructor
 * @param {Object} params - Parámetros del usuario.
 * @param {string} params.id - Identificador único.
 * @param {string} params.nombre - Nombre del usuario.
 * @param {string} params.email - Correo electrónico único.
 * @param {string} params.password - Contraseña hasheada.
 * @param {string} params.rol - Rol (admin o vendedor).
 * @param {Date} params.createdAt - Fecha de creación.
 */
class User {
  constructor({ id, nombre, email, password, rol, createdAt }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.createdAt = createdAt;
  }
}

export default User;