import express from 'express'
import product from './routes/products.router.js';
import cart from './routes/carts.router.js';
import views from './routes/views.router.js'
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
/* import ProductManager from './service/ProductManager.js'; */
import mongoose from 'mongoose';
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

// Rutas
app.use('/api/products', product);
app.use('/api/cart', cart);
app.use('/', views)

// Conexion a DB
const urlDB = 'mongodb://localhost:27017/proyectofinal'
const connectMongoDB = async () => {
    try {
        await mongoose.connect(urlDB)
        console.log('Conexion exitosa a la DB');
    } catch (error) {
        console.error(error);
        process.exit()
    }
}
connectMongoDB()

// Inicio del servidor
const httpServer = app.listen(PORT, () => {
    console.log(`RUN SERVER: http://localhost:${PORT}`)
})

// Inicializamos socket
/* const productManager = new ProductManager()
const io = new Server(httpServer)
io.on('connection', async socket => {

    // Detecto al cliente nuevo conectado
    console.log('Nuevo cliente conectado');
    async function mostrarProductos() {
        const products = await productManager.getAll()
        io.emit('mostrarProductos', products)
    }
    mostrarProductos()

    // Crear de un producto
    socket.on('createProduct', async data => {
        productManager.create(data)
        mostrarProductos()
    });

    // Eliminar producto
    socket.on('deleteProduct', async id => {
        const productDelete = await productManager.delete(id)
        if (productDelete) {
            mostrarProductos()
        }   
    }) 
}); */