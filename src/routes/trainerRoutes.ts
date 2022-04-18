import { Router } from 'express'
import TrainerController from '../controllers/TrainerController'

const trainerRoutes = Router()
const controller = new TrainerController()

trainerRoutes.get('/', controller.getAll)
trainerRoutes.get('/:id', controller.getById)
trainerRoutes.post('/', controller.create)
trainerRoutes.put('/:id', controller.update)
trainerRoutes.delete('/:id', controller.delete)

export default trainerRoutes