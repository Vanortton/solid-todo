import { FastifyReply, FastifyRequest } from 'fastify'
import { UpdateTaskUseCase } from '../../../app/useCases/updateTask/UpdateTaskUseCase'
import { Static } from 'typebox/type'
import { UpdateTaskSchema } from '../schemas/UpdateTaskSchemas'

export class UpdateTaskController {
    constructor(private useCase: UpdateTaskUseCase) {}

    async handler(
        request: FastifyRequest<{ Params: { id: string }; Body: Static<typeof UpdateTaskSchema> }>,
        reply: FastifyReply
    ) {
        const user = request.auth.user
        const { id } = request.params
        const { status, description } = request.body
        const result = await this.useCase.execute({ userId: user.id, task: { id, status, description } })
        if (result.isLeft()) return reply.status(result.error.httpStatus).send(result.error)
        return reply.status(204).send()
    }
}
