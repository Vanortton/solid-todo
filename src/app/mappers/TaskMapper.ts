import { Either, left, right } from '../../core/errors/either/Either'
import { Mapper } from '../../core/implementation/Mapper'
import { Task as TaskEntity } from '../../domain/entities/Task'
import { Task } from '../../generated/prisma'

export type BasicTaskModel = Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>

export class TaskMapper implements Mapper<TaskEntity, BasicTaskModel> {
    toPersistence(entity: TaskEntity): Either<BasicTaskModel> {
        return right({
            id: entity.id,
            status: entity.status,
            description: entity.description,
        })
    }

    toDomain(raw: BasicTaskModel): Either<TaskEntity> {
        const task = TaskEntity.create(raw, raw.id)
        if (task.isLeft()) return left(task.error)
        return right(task.result)
    }
}
