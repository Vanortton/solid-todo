import { FastifyInstance } from 'fastify'
import makeBetterAuthController from '../factories/makeBetterAuthController'

export default (app: FastifyInstance) => {
    app.route({
        method: ['GET', 'POST'],
        url: '/auth/*',
        handler: (req, reply) => {
            return makeBetterAuthController().handler(req, reply)
        },
    })
}
