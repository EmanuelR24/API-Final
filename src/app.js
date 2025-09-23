/**
 * Punto de entrada de la aplicación.
 */
import "dotenv/config";
import connectDB from "./config/database.js";
import app from "./interfaces/server.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor en puerto http://localhost:${PORT}`));
});