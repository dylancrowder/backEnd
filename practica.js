import * as fs from "fs/promises";
import { log } from "console";
class ManejarProducto {
  constructor() {
    this.producto = [];
    this.ruta = "./practicando.txt";
  }

  agregarProducto = async (precio, id, nombre) => {
    const nuevoProducto = {
      precio,
      id,
      nombre,
    };

    this.producto.push(nuevoProducto);
    await fs.writeFile(this.ruta, JSON.stringify(this.producto));
  };

  /* funcion para eliminar productos */
  eliminarProductoID = async (id) => {
    let respuesta = await fs.readFile(this.ruta, "utf-8");
    const parse = JSON.parse(respuesta);
    const data = parse;
    let productoFiltrado = data.filter((product) => product.id != id);
    this.producto = productoFiltrado;
    await fs.writeFile(this.ruta, JSON.stringify(this.producto));
    console.log(`Producto con id ${id} eliminado.`);
  };

  /* funcion para mostrar los productos */
  mostrarProductos = async () => {
    console.log(this.producto);
  };
}

const producto = new ManejarProducto();

async function gestionarProductos() {
  await producto.agregarProducto(120, 34, "nike");
  await producto.agregarProducto(110, 312, "puma");
  await producto.agregarProducto(130, 324, "vans");
  await producto.agregarProducto(140, 31, "adidas");

  await producto.eliminarProductoID(312);
  await producto.mostrarProductos();
}

gestionarProductos();
