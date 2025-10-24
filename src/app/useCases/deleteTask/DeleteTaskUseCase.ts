import { InvalidDataError } from '../../../core/errors/dictionary/InvalidDataError'
import { MissingParamsError } from '../../../core/errors/dictionary/MissingParamsError'
import { Either, left, right } from '../../../core/errors/either/Either'
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository'
import { DeleteTaskDTO } from './DeleteTaskDTO'

export class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    private validateId(id: string, field: 'userId' | 'taskId'): Either<void> {
        if (!id) return left(new MissingParamsError(field))
        if (typeof id !== 'string') return left(new InvalidDataError(field, 'Expected string'))
        return right(void 0)
    }

    async execute(dto: DeleteTaskDTO): Promise<Either<void>> {
        const { userId, taskId } = dto

        const userIdValidation = this.validateId(userId, 'userId')
        if (userIdValidation.isLeft()) return left(userIdValidation.error)

        const taskIdValidation = this.validateId(taskId, 'taskId')
        if (taskIdValidation.isLeft()) return left(taskIdValidation.error)

        await this.taskRepository.delete(userId, taskId)
        return right(void 0)
    }
}
