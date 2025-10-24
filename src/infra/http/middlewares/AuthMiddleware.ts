import { betterAuth } from 'better-auth'
import { fromNodeHeaders } from 'better-auth/node'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UnauthenticatedError } from '../../../core/errors/dictionary/UnauthenticatedError'
import { Session, User } from '../../../generated/prisma'

interface Auth {
    user: User
    session: Session
}

declare module 'fastify' {
    export interface FastifyRequest {
        auth: Auth
    }
}

export class AuthMiddleware {
    constructor(private auth: ReturnType<typeof betterAuth>) {}

    async handler(request: FastifyRequest, reply: FastifyReply) {
        const userData = await this.auth.api.getSession({
            headers: fromNodeHeaders(request.headers),
        })
        if (!userData) {
            const error = new UnauthenticatedError()
            return reply.status(error.httpStatus).send(error)
        }
        request.auth = userData as Auth
        return request
    }
}
