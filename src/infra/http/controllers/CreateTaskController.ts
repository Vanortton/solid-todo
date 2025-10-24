import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTaskUseCase } from '../../../app/useCases/createTask/CreateTaskUseCase'
import { Static } from 'typebox/type'
import { CreateTaskSchema } from '../schemas/CreateTaskSchemas'

export class CreateTaskController {
    constructor(private useCase: CreateTaskUseCase) {}

    async handler(request: FastifyRequest<{ Body: Static<typeof CreateTaskSchema> }>, reply: FastifyReply) {
        const { status, description } = request.body
        const user = request.auth.user
        const task = await this.useCase.execute({ userId: user.id, task: { status, description } })
        if (task.isLeft()) return reply.status(task.error.httpStatus).send(task.error)
        return reply.status(201).send(task.result)
    }
}
