import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'

export const PRIVATE_KEY = process.env.PRIVATE_KEY

export const generarToken = (user) => jwt.sign({_id: user._id, email: user.email, role: user.role, cart: user.cart}, PRIVATE_KEY, {expiresIn: '1d'})


