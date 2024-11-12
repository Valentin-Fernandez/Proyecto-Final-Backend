import user from "../models/user.js";

export default class UserDAO {

    static  async createUser(userCreate) {
        try {
            const newUser = await user.create(userCreate)
            return newUser
        } catch (error) {
            console.error('Error al crear el usuario')
        }
    }

    static async getUser(email) {
        try {
            const userFound = await user.findOne(email)
            return userFound
        } catch (error) {
            console.error('Error al encontrar el usuario', error)
        }
    }

    static async updateUser(userId, cartId) {
        try {
            const updateUser = await user.findByIdAndUpdate(userId, cartId)
            return updateUser
        } catch (error) {
            console.error('Error al actualizar el usuario', error)
        }
    }

    static async getAllUsers(){
        try {
            const getUsers = await user.find()
            return getUsers
        } catch (error) {
            console.error('Error al buscar los usuarios', error)
        }
    }
}