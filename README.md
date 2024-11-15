# Documentación de la API

---
## Cuentas ya creadas en la web para hacer las pruebas
`email: admin@gmail.com`
`password: 1234`
`Role: ADMIN`

`email: user@gmail.com`
`password: 1234`
`Role: USER`

### en el endpoint de api/sessions/current devuelve todos los users de la DB pero de manera personalizada con el DTO, solamente pueden hacer peticion a esta ruta los ADMINS

## views.router.js

**Index.handlebars**  
`http://localhost:8080`  
En `index.handlebars` se visualizaran todos los productos que esten en la DB, para poder agregar productos al carrito debemos hacer el registro o logueo previamente. 

### Filtrar por categoría y ordenar por precio ascendente:

`http://localhost:8080/?category=Audio&price=asc&page=1`

### Solo ordenar por precio descendente:

`http://localhost:8080/?price=desc&page=1`

### Solo paginación sin filtros ni ordenamiento:

`http://localhost:8080/?page=2`

Por defecto, si no ponemos `page`, va a ser igual a 1.

**RealTimeProducts**  
`http://localhost:8080/realtimeproducts`  
Aplica websocket. En esta vista solamente pueden entrar los Administradores ya que desde aca se puede agregar un producto a la DB

**Cart**  
`http://localhost:8080/cart/:cid`  
Se van a mostrar los productos agregados al carrito. Se podra finalizar la compra, esto devuelve un Ticket con los detalles(Total, email y fecha de compra)

---

## Carts.router.js

`http://localhost:8080/api/cart`

### GET

- **Buscar el carrito por ID:**  
  `http://localhost:8080/api/cart/:cid`

### POST

- **Crear carrito:**  
  `http://localhost:8080/api/cart`

- **Agregar producto al carrito:**  
  `http://localhost:8080/api/cart/:cid/product/:pid`

### PUT

- **Actualizar carrito:**  
  `http://localhost:8080/api/cart/:cid`  
  Recibe por el body un array con productos. El body debe ser:
  ```json
  [
    {
      "product": "66fdc289ac286c7cd6a12200",
      "quantity": 15,
      "_id": "66fdfeeb5578cb682090b4c5"
    },
    {
      "product": "66fdc289ac286c7cd6a12201",
      "quantity": 1,
      "_id": "66fdfef65578cb682090b4c9"
    },
    {
      "product": "66fdc289ac286c7cd6a121fe",
      "quantity": 21,
      "_id": "66fdff045578cb682090b4ce"
    }
  ]
  ```

### PUT

- **Actualizar cantidad de productos:**  
  `http://localhost:8080/api/cart/:cid/product/:pid`  
  El body debe ser:
  ```json
  {
    "quantity": 5
  }
  ```

### DELETE

- **Eliminar producto del carrito:**  
  `http://localhost:8080/api/cart/:cid/product/:pid`  
  Elimina del carrito el producto seleccionado.

- **Eliminar todos los productos del carrito, menos el carrito:**  
  `http://localhost:8080/api/cart/:cid`

---

## Products.router.js

### GET

- **Obtener todos los productos:**  
  `http://localhost:8080/api/products`  
  Se pueden agregar parámetros como `?page=2&category=Accesorios&price=desc`.

  - `page`: Número de la página a navegar.
  - `category`: Categoría a mostrar.
  - `price`: `desc`/`asc`.

- **Obtener un producto por ID:**  
  `http://localhost:8080/api/products/:pid`

### POST

- **Creación de producto:**
  `http://localhost:8080/api/products`  
   El body debe ser:
  ```json
  {
    "title": "Teclado Redragon",
    "description": "Teclado mecánico RGB",
    "price": 50.75,
    "category": "Accesorios",
    "stock": 10,
    "status": true
  }
  ```
- **OBLIGATORIO:** `title`, `price`, `stock`.

### PUT

- **Actualizar un producto por ID:**  
  `http://localhost:8080/api/products/:pid`  
  El body debe ser, por ejemplo:
  ```json
  {
    "title": "Teclado Genius"
  }
  ```

### DELETE

- **Eliminar un producto por ID:**  
  `http://localhost:8080/api/products/:pid`  
  Elimina por ID un producto.
