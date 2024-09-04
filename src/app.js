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

    socket.on('createProduct', data => {
        // Verifica que "name" y otros campos estén en el objeto
        console.log('Producto recibido en el servidor:', data);

        const newProduct = productManager.addProduct(data);
        io.emit('productAdded', newProduct); // Cambiado para coincidir con el cliente
    });
});