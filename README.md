Documentación de la API
Endpoints y Funcionalidades

1. views.router.js
   Página principal - index.handlebars
   URL: http://localhost:8080
   En esta página, se crea automáticamente un carrito para que los usuarios puedan agregar productos. Si se navega a otras páginas, el ID del carrito se incluirá en los parámetros de la URL, permitiendo agregar productos al mismo carrito. Si se elimina el parámetro cartId, se generará un nuevo carrito.

Filtrar por categoría y ordenar por precio ascendente:
http://localhost:8080/?category=Audio&price=asc&page=1

Solo ordenar por precio descendente:
http://localhost:8080/?price=desc&page=1

Solo paginación sin filtros ni ordenamiento:
http://localhost:8080/?page=2

Nota: Por defecto, si no se especifica page, se establecerá en 1.

Página de productos en tiempo real - RealTimeProducts.handlebars
URL: http://localhost:8080/realtimeproducts
Esta página utiliza WebSockets para mostrar productos en tiempo real.

Página del carrito - cart.handlebars
URL: http://localhost:8080/cart/:cid
Aquí se mostrarán los productos que se han agregado al carrito.

2. Carts.router.js
   Base URL: http://localhost:8080/api/cart

GET - Buscar el carrito por ID
URL: http://localhost:8080/api/cart/:cid

POST - Crear un carrito
URL: http://localhost:8080/api/cart

POST - Agregar producto al carrito
URL: http://localhost:8080/api/cart/:cid/product/:pid
Agrega un producto al carrito usando su ID.

PUT - Actualizar el carrito
URL: http://localhost:8080/api/cart/:cid
Body: Debe contener un array de productos en el siguiente formato:

json
Copiar código
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
PUT - Actualizar la cantidad de un producto
URL: http://localhost:8080/api/cart/:cid/product/:pid
Body:

json
Copiar código
{
"quantity": 5
}
DELETE - Eliminar un producto del carrito
URL: http://localhost:8080/api/cart/:cid/product/:pid

DELETE - Eliminar todos los productos del carrito
URL: http://localhost:8080/api/cart/:cid

3. Products.router.js
   Base URL: http://localhost:8080/api/products

GET - Obtener todos los productos
URL: http://localhost:8080/api/products
Puedes agregar parámetros como: ?page=2&category=Accesorios&price=desc

page: Número de la página a navegar.
category: Categoría a mostrar.
price: desc o asc.
GET - Obtener un producto por ID
URL: http://localhost:8080/api/products/:pid

POST - Crear un nuevo producto
URL: http://localhost:8080/api/products
Body:

json
Copiar código
{
"title": "Teclado Redragon",
"description": "Teclado mecánico RGB",
"price": 50.75,
"category": "Accesorios",
"stock": 10,
"status": true
}
Nota: Los campos title, price y stock son obligatorios.

PUT - Actualizar un producto por ID
URL: http://localhost:8080/api/products/:pid
Body:

json
Copiar código
{
"title": "Teclado Genius"
}
DELETE - Eliminar un producto por ID
URL: http://localhost:8080/api/products/:pid
