import { FastifyReply, FastifyRequest } from 'fastify'
import { ListTasksUseCase } from '../../../app/useCases/listTasks/ListTasksUseCase'

export class ListTasksController {
    constructor(private useCase: ListTasksUseCase) {}

    async handler(request: FastifyRequest, reply: FastifyReply) {
        const user = request.auth.user
        const tasks = await this.useCase.execute({ userId: user.id })
        if (tasks.isLeft()) return reply.status(tasks.error.httpStatus).send(tasks.error)
        return reply.status(200).send(tasks.result.value)
    }
}
