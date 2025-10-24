import { InvalidDataError } from '../../../core/errors/dictionary/InvalidDataError'
import { MissingParamsError } from '../../../core/errors/dictionary/MissingParamsError'
import { Either, left, right } from '../../../core/errors/either/Either'
import { Task } from '../../../domain/entities/Task'
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository'
import { CreateTaskDTO } from './CreateTaskDTO'

export class CreateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    private validateUserId(userId: string): Either<void> {
        if (!userId) return left(new MissingParamsError('userId'))
        if (typeof userId !== 'string') return left(new InvalidDataError('userId', 'Expected string'))
        return right(void 0)
    }

    async execute(dto: CreateTaskDTO): Promise<Either<Task>> {
        const validation = this.validateUserId(dto.userId)
        if (validation.isLeft()) return left(validation.error)
        if (!dto.task) return left(new MissingParamsError('task'))

        const task = Task.create({ ...dto.task })
        if (task.isLeft()) return left(task.error)
        await this.taskRepository.create(dto.userId, task.result)
        return right(task.result)
    }
}
