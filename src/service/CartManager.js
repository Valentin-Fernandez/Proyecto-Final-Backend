import fs from 'fs/promises'
import path from 'path'

const cartFilePath = path.resolve('data', 'carrito.json')

export default class CartManager {
    constructor() {
        this.carts = []
        this.init()
    }

    async init(){
        try {
            const data = await fs.readFile(cartFilePath, 'utf-8')
            this.carts = JSON.parse(data)
        } catch (error) {
            this.carts = []
        }
    }

    // Metodos
    saveToFile(){
        fs.writeFile(cartFilePath, JSON.stringify(this.carts, null, 2))
    }

    getCartById(id){
        return this.carts.find(cart => cart.id === id)
    }

    addCart(){
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length -1].id + 1 : 1,
            products: []
        }
        this.carts.push(newCart)
        this.saveToFile()
        return newCart
    }

    addCartAddProduct(idCart, id, quantity){
        const findCart = this.carts.find(c => c.id === idCart)
        if (!findCart) {
            return null;
        }

        const productCart = findCart.products.find(p => p.id === id)
        console.log(productCart);
        if (productCart) {
            productCart.quantity += quantity
        } else {
            findCart.products.push({id, quantity})
        }
        this.saveToFile()
        return findCart;
    }
}