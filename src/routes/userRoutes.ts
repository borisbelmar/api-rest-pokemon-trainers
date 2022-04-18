import { Router } from 'express'
import UserController from '../controllers/UserController'

const userRoutes = Router()
const controller = new UserController()

userRoutes.get('/', controller.getAll)
userRoutes.get('/:id', controller.getById)
userRoutes.post('/', controller.create)
userRoutes.put('/:id', controller.update)
userRoutes.delete('/:id', controller.delete)

export default userRoutes