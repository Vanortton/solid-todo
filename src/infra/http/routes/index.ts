import { FastifyInstance } from 'fastify'
import betterAuthRoutes from './betterAuthRoutes'
import tasksRoutes from './tasksRoutes'

export default (app: FastifyInstance) => {
    betterAuthRoutes(app)
    tasksRoutes(app)
}
