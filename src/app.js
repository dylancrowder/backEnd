import express from "express";
import ProductManager from "./Product.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();

const readProducts = productos.readProducts();

app.get("/productos", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) {
    return res.send(await readProducts);
  }
  let productoRequerido = await readProducts;
  let productoLimite = productoRequerido.slice(0, limit);
  res.send(productoLimite);
});

app.get("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let productoRequerido = await readProducts;
  let productoByID = productoRequerido.find((product) => product.id === id);
  res.send(productoByID);
});

const port = 8080;

const server = app.listen(port, () => {
  console.log(`express local host ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(error);
});
