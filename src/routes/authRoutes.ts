import { Router } from 'express'
import AuthController from '../controllers/AuthController'

const authRoutes = Router()
const controller = new AuthController()

authRoutes.post('/login', controller.login)
authRoutes.post('/register', controller.register)

export default authRoutes