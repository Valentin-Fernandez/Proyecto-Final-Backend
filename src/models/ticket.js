import moongose from 'mongoose'

// Collection
const ticketCollection = 'tickets'
const ticketSchema = new moongose.Schema({
    userId: {type: moongose.Schema.Types.ObjectId, ref: 'users', required: true},
    products: [
        {
            productId: {type: moongose.Schema.Types.ObjectId, ref: 'products', required: true},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ],
    totalPrice: {type: Number, required: true},
    dateTicket: {type: Date, required: true}
})

const Ticket = moongose.model(ticketCollection, ticketSchema)

export default Ticket