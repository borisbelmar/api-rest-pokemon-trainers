import { Router } from 'express'
import HealthController from '../controllers/HealthController'

const healthRoutes = Router()
const controller = new HealthController()

healthRoutes.get('/info', controller.info)
healthRoutes.get('/ping', controller.ping)

export default healthRoutes