import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import { FastifyInstance } from 'fastify'
import { env } from '../../config/envs'
import fastifyCookie from '@fastify/cookie'
import fastifyCompress from '@fastify/compress'

export default (app: FastifyInstance) => {
    app.register(fastifyHelmet)
    app.register(fastifyRateLimit, { max: 200, timeWindow: '1 minute' })
    app.register(fastifyCors, { origin: env.FRONT_URL })
    app.register(fastifyCookie)
    app.register(fastifyCompress)
}
