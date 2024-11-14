import Ticket from "../models/ticket.js";

export default class TicketDAO {

    static async createTicket(ticket) {
        try {
            const newTicket = await Ticket.create(ticket)
            return newTicket
        } catch (error) {
            console.error('Error al crear el ticket', error)
        }
        
    }

}