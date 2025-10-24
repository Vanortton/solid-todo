import fastify from 'fastify'
import routes from './infra/http/routes'
import fastifyMiddlewares from './infra/http/middlewares/fastifyMiddlewares'

export const app = fastify({ logger: true, pluginTimeout: 1000 * 30 })
app.register(fastifyMiddlewares)
app.register(routes)
