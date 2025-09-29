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
 * @param {string} params.contraseña - Contraseña en texto plano.
 */
class User {
  constructor({ id, nombre, email, contraseña }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
  }
}

export default User;