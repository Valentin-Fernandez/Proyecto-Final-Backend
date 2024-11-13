import UserDAO from "../dao/UserDAO.js";
import userDTO from "../dto/UserDTO.js";

export default class UserRepository {

    static async createUser(user) {
        const newUser = await UserDAO.createUser(user)
        return newUser
    }

    static async getUser(email) {
        const user = await UserDAO.getUser(email)
        return user
    }

    static async updateUserCart(userId, cartId) {
        return await UserDAO.updateUser(userId, { cart: cartId })
    }

    static async current(){
        const users = await UserDAO.getAllUsers()
        const usersDTO = users.map(user => new userDTO(user))
        return usersDTO
    }

}