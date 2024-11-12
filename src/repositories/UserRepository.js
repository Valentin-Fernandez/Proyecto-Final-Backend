import UserDAO from "../dao/UserDAO.js";

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
        return await UserDAO.getAllUsers()
    }

}