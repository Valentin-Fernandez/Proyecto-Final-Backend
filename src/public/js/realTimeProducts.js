const socket = io();

// Envio del formulario
const form = document.getElementById('productForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    // Envía todos los campos, asegurándote de que "name" está incluido
    socket.emit('createProduct', { name, description, price, stock, category });
    form.reset();
});

// Escucha de producto agregado
socket.on('productAdded', (product) => {
    const container = document.querySelector('.container_product');
    const productElement = document.createElement('div');
    
    // Verifica que el campo name está presente en el objeto
    console.log('Producto recibido:', product);

    productElement.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <p>Categoria: ${product.category}</p>
    `;

    container.appendChild(productElement);
});