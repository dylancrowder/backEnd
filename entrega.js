// Cree la clase producto con su constructor
class ProductManager {
  constructor() {
    this.products = [];
  }
  static id = 0;
  addProducts(title, description, price, thumbnail, code, stock) {
    for (let index = 0; index < this.products.length; index++) {
      if (this.products[index].code === code) {
        console.log(`"esta repetido = ${code}"`);
        break;
      }
    }
    ProductManager.id++;
    this.products.push({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    });
  }
  getproducts() {
    return this.products;
  }

  exist(id) {
    return this.products.find((producto) => producto.id === id);
  }

  getProductsByid(id) {
    !this.exist(id) ? console.log("no esta") : console.log(this.exist(id));
  }
}
const productos = new ProductManager();

productos.addProducts("nike", "nuevas zapatillas", 100, "nke1", 3242, 10);
productos.addProducts("nike", "nuevas zapatillas", 100, "nke1", 3242, 10);

console.log(productos.getproducts());
/* productos.getProductsByid(2);  */
