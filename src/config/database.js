/**
 * Establece la conexión con la base de datos MongoDB.
 * 
 * @function connectDB
 * @async
 * @returns {Promise<void>} Una promesa que se resuelve cuando la conexión se establece. Si falla, termina el proceso.
 */
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error de conexión:", err);
    process.exit(1);
  }
};

export default connectDB;