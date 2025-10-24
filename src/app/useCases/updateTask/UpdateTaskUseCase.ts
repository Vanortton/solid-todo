import { InvalidDataError } from '../../../core/errors/dictionary/InvalidDataError'
import { MissingParamsError } from '../../../core/errors/dictionary/MissingParamsError'
import { Either, left, right } from '../../../core/errors/either/Either'
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository'
import { UpdateTaskDTO } from './UpdateTaskDTO'

export class UpdateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    private validateUserId(userId: string): Either<void> {
        if (!userId) return left(new MissingParamsError('userId'))
        if (typeof userId !== 'string') return left(new InvalidDataError('userId', 'Expected string'))
        return right(void 0)
    }

    async execute(dto: UpdateTaskDTO): Promise<Either<void>> {
        const validation = this.validateUserId(dto.userId)
        if (validation.isLeft()) return left(validation.error)
        if (!dto.task) return left(new MissingParamsError('task'))

        const result = await this.taskRepository.update(dto.userId, dto.task)
        if (result.isLeft()) return left(result.error)

        return right(void 0)
    }
}
