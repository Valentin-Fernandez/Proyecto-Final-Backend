import express from 'express'
import product from './routes/products.router.js';
import cart from './routes/carts.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import ProductManager from './service/ProductManager.js';
const app = express()
const PORT = 8080

// Configuracion HBs
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Middlewares
app.use(express.json()) // -> Manejo de JSON
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))


app.use('/api', product);
app.use('/api', cart);

const httpServer = app.listen(PORT, () => {
    console.log(`RUN SERVER: http://localhost:${PORT}`)
})

// Inicializamos socket
const productManager = new ProductManager()
const io = new Server(httpServer)
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    // Detecto que alguien entro en la pagina
    const products = productManager.getAllProducts()
    io.emit('mostrarProductos', products)

    // Crear de un producto
    socket.on('createProduct', data => {
        productManager.addProduct(data)
        const updatedProducts = productManager.getAllProducts();
        io.emit('updateProducts', updatedProducts)
    });

    // Eliminar producto
    socket.on('deleteProduct', id => {
        const productDelete = productManager.deleteProduct(parseInt(id))
        if (productDelete) {
            const updatedProducts = productManager.getAllProducts();
            io.emit('updateProducts', updatedProducts)
        }   
    })



    
});