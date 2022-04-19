import { Router } from 'express'
import UserController from '../controllers/UserController'
import tokenValidator from '../middlewares/tokenValidator'

const userRoutes = Router()
const controller = new UserController()

userRoutes.get('/', tokenValidator(), controller.getAll)
userRoutes.get('/:id', tokenValidator(), controller.getById)
userRoutes.post('/', tokenValidator({ adminOnly: true }), controller.create)
userRoutes.put('/:id', tokenValidator(), controller.update)
userRoutes.delete('/:id', tokenValidator(), controller.delete)

export default userRoutes