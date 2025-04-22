import express from "express";
import persona from "./routes/persona.routes";
import articulos from "./routes/articulo.routes";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 10101;

app.use("/persona", persona);
app.use("/articulo", articulos);

app.listen(PORT, () => {
  console.log("Escuchando el puerto", PORT);
});
