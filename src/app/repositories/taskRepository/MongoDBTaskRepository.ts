import { ITaskRepository } from '../../../domain/repositories/ITaskRepository'
import { Either, left, right } from '../../../core/errors/either/Either'
import { just, Maybe, nothing } from '../../../core/errors/maybe/Maybe'
import { Task, TaskProps } from '../../../domain/entities/Task'
import { PrismaClient } from '../../../generated/prisma'
import { Mapper } from '../../../core/implementation/Mapper'
import { BasicTaskModel } from '../../mappers/TaskMapper'
import { DatabaseError } from '../../../core/errors/dictionary/DatabaseError'

export class MongoDBTaskRepository implements ITaskRepository {
    constructor(
        private db: PrismaClient,
        private mapper: Mapper<Task, BasicTaskModel>
    ) {}

    async list(userId: string): Promise<Either<Maybe<Task[]>>> {
        try {
            const tasks = await this.db.task.findMany({ where: { userId } })
            if (!tasks) return right(nothing())
            const domainTasks: Task[] = []
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i]
                const domainTask = this.mapper.toDomain(task)
                if (domainTask.isLeft()) return left(domainTask.error)
                domainTasks.push(domainTask.result)
            }
            return right(just(domainTasks))
        } catch (error) {
            return left(new DatabaseError(error as Error))
        }
    }

    async findById(userId: string, taskId: string): Promise<Either<Maybe<Task>>> {
        try {
            const task = await this.db.task.findUnique({ where: { id: taskId, userId } })
            if (!task) return right(nothing())
            const domainTask = this.mapper.toDomain(task)
            if (domainTask.isLeft()) return left(domainTask.error)
            return right(just(domainTask.result))
        } catch (error) {
            return left(new DatabaseError(error as Error))
        }
    }

    async create(userId: string, task: Task): Promise<Either<void>> {
        try {
            const plainTask = this.mapper.toPersistence(task)
            if (plainTask.isLeft()) return left(plainTask.error)
            await this.db.task.create({ data: { ...plainTask.result, userId } })
            return right(void 0)
        } catch (error) {
            return left(new DatabaseError(error as Error))
        }
    }

    async update(userId: string, task: Partial<TaskProps> & { id: string }): Promise<Either<void>> {
        try {
            const { id, ...data } = task
            await this.db.task.update({ data, where: { id, userId } })
            return right(void 0)
        } catch (error) {
            return left(new DatabaseError(error as Error))
        }
    }

    async delete(userId: string, taskId: string): Promise<Either<void>> {
        try {
            await this.db.task.delete({ where: { id: taskId, userId } })
            return right(void 0)
        } catch (error) {
            return left(new DatabaseError(error as Error))
        }
    }
}
