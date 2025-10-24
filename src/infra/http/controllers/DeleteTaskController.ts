import { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteTaskUseCase } from '../../../app/useCases/deleteTask/DeleteTaskUseCase'
import { Static } from 'typebox/type'
import { DeleteTaskSchema } from '../schemas/DeleteTaskSchemas'

export class DeleteTaskController {
    constructor(private useCase: DeleteTaskUseCase) {}

    async handler(request: FastifyRequest<{ Params: Static<typeof DeleteTaskSchema> }>, reply: FastifyReply) {
        const user = request.auth.user
        const { id } = request.params
        const result = await this.useCase.execute({ userId: user.id, taskId: id })
        if (result.isLeft()) return reply.status(result.error.httpStatus).send(result.error)
        return reply.status(202).send()
    }
}
