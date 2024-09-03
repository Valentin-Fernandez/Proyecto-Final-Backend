import express from 'express'
import product from './routes/products.router.js';
import cart from './routes/carts.router.js';
const app = express()
const PORT = 8080

// Configuracion
app.use(express.json()) // -> Manejo de JSON
app.use(express.urlencoded({extended: true}))

app.use('/api', product);
app.use('/api', cart);

app.listen(PORT, () => {
    console.log(`RUN SERVER: http://localhost:${PORT}`)
})