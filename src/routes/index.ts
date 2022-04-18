import { Router } from 'express'
import tokenValidator from '../middlewares/tokenValidator'
import authRoutes from './authRoutes'
import healthRoutes from './healthRoutes'
import trainerRoutes from './trainerRoutes'
import userRoutes from './userRoutes'

const apiRoutes = Router()

apiRoutes.use('/', healthRoutes)
apiRoutes.use('/users', tokenValidator, userRoutes)
apiRoutes.use('/trainers', tokenValidator, trainerRoutes)
apiRoutes.use('/auth', authRoutes)

export default apiRoutes