import express from "express";
import usuario from "./routes/userRegister.routes";

const app = express();
const port = 10101;

app.use(express.json());

app.use(usuario);

app.listen(port, () => {
  console.log("Escuchando el puerto", port);
});
