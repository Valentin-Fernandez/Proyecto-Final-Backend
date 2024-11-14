import TicketDAO from "../dao/TicketDAO.js";

export default class TicketRepository {

    static async createTicket(ticket) {
        const newTicket = await TicketDAO.createTicket(ticket)
        return newTicket
    }

}