document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const productForm = document.getElementById('productForm');
    const containerProduct = document.querySelector('.container_product');

    const updateProductList = (products) => {
        containerProduct.innerHTML = ''; // Limpio la lista actual
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <h2>${product.title}</h2>
                <p>Description: ${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Categoria: ${product.category}</p>
                <button class="delete_product" data-id="${product.id}">Eliminar</button>
            `;
            containerProduct.appendChild(productDiv);
        });
    
        // Evento para los botones
        document.querySelectorAll('.delete_product').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                socket.emit('deleteProduct', id);
            });
        });
    };

    // Escuchar evento
    socket.on('updateProducts', (products) => {
        updateProductList(products);
    });

    // Enviar nuevo producto al servidor
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;
        const category = document.getElementById('category').value;
        socket.emit('createProduct', { title, description, price, stock, category });
        productForm.reset(); // Limpiar el formulario
    });

    // Cliente conectado
    socket.on('mostrarProductos', (products) => {
        console.log(products);
        updateProductList(products)
    })
});
