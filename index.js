import express from "express";
import dotenv from "dotenv";
import EstadoRoute from "./routes/Estado.Route.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}`);
  next();
});

app.use("/estado", EstadoRoute);

app.listen(port, () => {
  console.log(`Escuchando en puerto: ${port}`);
});
