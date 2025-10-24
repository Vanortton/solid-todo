import { InvalidDataError } from '../../../core/errors/dictionary/InvalidDataError'
import { MissingParamsError } from '../../../core/errors/dictionary/MissingParamsError'
import { Either, left, right } from '../../../core/errors/either/Either'
import { just, Maybe, nothing } from '../../../core/errors/maybe/Maybe'
import { Task } from '../../../domain/entities/Task'
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository'
import { ListTasksDTO } from './ListTasksDTO'

export class ListTasksUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    private validateUserId(userId: string): Either<void> {
        if (!userId) return left(new MissingParamsError('userId'))
        if (typeof userId !== 'string') return left(new InvalidDataError('userId', 'Expected string'))
        return right(void 0)
    }

    async execute({ userId }: ListTasksDTO): Promise<Either<Maybe<Task[]>>> {
        const userIdValidation = this.validateUserId(userId)
        if (userIdValidation.isLeft()) return left(userIdValidation.error)

        const tasks = await this.taskRepository.list(userId)
        if (tasks.isLeft()) return left(tasks.error)
        if (tasks.result.isEmpty()) return right(nothing())

        return right(just(tasks.result.value))
    }
}
