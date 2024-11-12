import UserRepository from "../repositories/UserRepository.js";
import CartRepository from "../repositories/CartRepository.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generarToken } from "../utils/jwt.js";

export default class UserController {

    static async register(req ,res) {
        try {
            const {first_name, last_name, email, age, password} = req.body
            if (!first_name || !email || !password) return res.send({status:'error', error:'completa todos los campos'})
            
            const userFound = await UserRepository.getUser({email})
            if(userFound) return res.send({status: 'error', error:'El usuario ya existe con ese email'})
            
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            // Creacion del user
            const result = await UserRepository.createUser(newUser)

            // Creacion del carrito
            const newCart = await CartRepository.createCart(result._id)

            // Referencia
            await UserRepository.updateUserCart(result._id, newCart._id)

            res.send({status: 'success', message:'Usuario creado con exito'})
        } catch (error) {
            console.error('Error del servidor', error)
        }
    }

    static async login(req, res) {
        try {
            const {email, password} = req.body
            if(!email || !password) return res.send('Faltan campos')
            
            const userFound = await UserRepository.getUser({email})
            if(!userFound) return res.send({status:'error', error:'No existe el usuario con ese email'})
    
            // Validar password
            if(!isValidPassword(password, userFound)) return res.send({status:'error', error:'credenciales incorrectas'})

            // Token
            const token = generarToken(userFound)
            res.cookie('token', token, {maxAge: 60*60*1000, httpOnly: true}).send({status:'success', message:'Logueado correctamente'})
    
        } catch (error) {
            console.error('Error del servidor', error)
        }
    }

    static async current(req, res) {
        try {
            const users = await UserRepository.current()
            res.json(users)
        } catch (error) {
            console.error('Error del servidor', error)
        }
    }
}