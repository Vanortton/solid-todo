import { FastifyInstance } from 'fastify'
import betterAuthRoutes from './betterAuthRoutes'

export default (app: FastifyInstance) => {
    betterAuthRoutes(app)
}
