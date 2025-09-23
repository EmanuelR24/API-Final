/**
 * Repositorio de usuarios usando MongoDB.
 * 
 * @class UserRepositoryMongo
 * 
 * @method create - Crea un usuario.
 * @method findAll - Obtiene todos.
 * @method findById - Busca por ID.
 * @method findByEmail - Busca por email.
 * @method update - Actualiza.
 * @method delete - Elimina.
 */
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ["admin", "vendedor"] },
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("User", UserSchema);

class UserRepositoryMongo {
  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findAll() {
    return await UserModel.find();
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async update(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default UserRepositoryMongo;