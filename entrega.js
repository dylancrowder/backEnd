import { log } from "console";
import * as fs from "fs/promises";

class ProductManager {
  constructor() {
    this.path = "./productos.txt";
    this.products = [];
  }
  static id = 0;

  // Método para agregar un producto
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.log(`El producto con código ${code} ya existe.`);
      return;
    }

    // Incrementa el ID del producto
    ProductManager.id++;

    // Crea el nuevo producto
    let nuevoProducto = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };

    // Agrego el producto al array de productos
    this.products.push(nuevoProducto);
    // Escribo los productos en el archivo
    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  // Método para leer los productos del archivo
  readProductos = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };

  // Método para obtener todos los productos
  getProducts = async () => {
    let respuesta2 = await this.readProductos();
    console.log(respuesta2);
  };

  deleteProducts = async (id) => {
    let respuesta3 = await this.readProductos();

    // Filtrar el producto con el id proporcionado
    let productoFiltrado = respuesta3.filter((product) => product.id != id);

    this.products = productoFiltrado;
    await fs.writeFile(this.path, JSON.stringify(this.products));
    console.log(`Producto con id ${id} eliminado.`);
  };

  // Método para obtener un producto por su código
  getProductByCode = async (code) => {
    const product = this.products.find((product) => product.code === code);
    if (!product) {
      console.log("El producto no existe.");
    } else {
      console.log(product);
    }
  };

  // Método para obtener un producto por su ID
  getProductById = async (id) => {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.log("El producto no existe.");
    } else {
      console.log(product);
    }
  };
}

(async () => {
  const productos = new ProductManager();

  await productos.addProduct(
    "nike",
    "nuevas zapatillas",
    100,
    "nke1",
    1234,
    10
  );

  await productos.addProduct("adidas", "otras zapatillas", 23, "adi1", 134, 15);
  await productos.addProduct(
    "VANS",
    "otras zapatillass",
    21,
    "adi1",
    1341,
    151
  );
  await productos.getProducts();
  await productos.deleteProducts(2);
  await productos.getProductByCode(1234);
  await productos.getProductById(2);
})();
