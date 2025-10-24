import { Either } from '../../core/errors/either/Either'
import { Maybe } from '../../core/errors/maybe/Maybe'
import { Task, TaskProps } from '../entities/Task'

export interface ITaskRepository {
    list(userId: string): Promise<Either<Maybe<Task[]>>>
    create(userId: string, task: Task): Promise<Either<void>>
    update(userId: string, task: Partial<TaskProps> & { id: string }): Promise<Either<void>>
    findById(userId: string, taskId: string): Promise<Either<Maybe<Task>>>
    delete(userId: string, taskId: string): Promise<Either<void>>
}
