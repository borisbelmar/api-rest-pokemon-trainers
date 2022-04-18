import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import apiRoutes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1', apiRoutes)

export default app
