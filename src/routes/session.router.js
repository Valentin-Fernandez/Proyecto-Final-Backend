import { Router } from "express";
import UserController from "../controllers/UserController.js";
import passport from 'passport'
import { authorization } from "../middlewares/authorization.js";

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/current', passport.authenticate('jwt', { session: false }), authorization(['ADMIN']), UserController.current)

export default router

