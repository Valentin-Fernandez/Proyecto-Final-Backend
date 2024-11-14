import dotenv from 'dotenv'
dotenv.config() // .env
import express from 'express'
import passport from 'passport';
import product from './routes/products.router.js';
import cart from './routes/carts.router.js';
import views from './routes/views.router.js'
import session from './routes/session.router.js'
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io'
import ProductRepository from './repositories/ProductRepository.js';
import mongoose from 'mongoose';
import initializePassport from './config/passport.config.js'
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
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

// Rutas
app.use('/api/products', product);
app.use('/api/cart', cart);
app.use('/api/sessions', session)
app.use('/', views)

// Conexion a DB
const urlDB = process.env.URL_DB
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
const io = new Server(httpServer)
io.on('connection', async socket => {

    // Detecto al cliente nuevo conectado
    console.log('Nuevo cliente conectado');
    async function mostrarProductos() {
        const products = await ProductRepository.getAllSocket()
        io.emit('mostrarProductos', products)
    }
    mostrarProductos()

    // Crear de un producto
    socket.on('createProduct', async data => {
        ProductRepository.createProduct(data)
        mostrarProductos()
    });

    // Eliminar producto
    socket.on('deleteProduct', async id => {
        const productDelete = await ProductRepository.deleteProduct(id)
        if (productDelete) {
            mostrarProductos()
        }   
    }) 
});