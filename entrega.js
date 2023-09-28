class ProductManager {
  constructor() {
    this.products = [];
  }
  static id = 0; // Declaración de una propiedad estática para llevar un registro de IDs únicos.

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar si todos los campos obligatorios están presentes
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    // Validar si el código ya existe en la lista de productos
    if (this.products.some((product) => product.code === code)) {
      console.log(`El producto con código ${code} ya existe.`);
      return;
    }

    ProductManager.id++; // Incrementar el ID único del producto.
    this.products.push({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id, // Asignar el ID único al producto.
    });

    console.log("Producto agregado exitosamente.");
  }

  getProducts() {
    return this.products;
  }

  exists(id) {
    return this.products.find((product) => product.id === id);
  }

  getProductById(id) {
    const product = this.exists(id);
    if (!product) {
      console.log("El producto no existe.");
    } else {
      console.log(product);
    }
  }
}

const productos = new ProductManager(); // Crear una instancia de la clase ProductManager.

productos.addProduct("nike", "nuevas zapatillas", 100, "nke1", 1234, 10); // Agregar un producto.
productos.addProduct("adidas", "otras zapatillas", 23, "adi1", 134, 15); // Agregar otro producto.

console.log(productos.getProducts()); // Mostrar la lista de productos.
productos.getProductById(2); // Intentar obtener un producto por su ID (este ID no existe).
