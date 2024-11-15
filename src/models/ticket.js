import moongose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';

// Collection
const ticketCollection = 'tickets'
const ticketSchema = new moongose.Schema({ 
    code: {type: String, unique: true, default: uuidv4},   
    dateTicket: {type: Date, required: true},
    totalPrice: {type: Number, required: true},
    email: {type: String}
})

const Ticket = moongose.model(ticketCollection, ticketSchema)

export default Ticket