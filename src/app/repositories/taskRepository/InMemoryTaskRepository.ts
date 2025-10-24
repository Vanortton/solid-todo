import { NotFoundError } from '../../../core/errors/dictionary/NotFoundError'
import { Either, left, right } from '../../../core/errors/either/Either'
import { just, Maybe, nothing } from '../../../core/errors/maybe/Maybe'
import { Task, TaskProps } from '../../../domain/entities/Task'
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository'

export class InMemoryTaskRepository implements ITaskRepository {
    tasks: Record<string, Task[]> = {}

    async list(userId: string): Promise<Either<Maybe<Task[]>>> {
        const userTasks = this.tasks[userId]
        if (!userTasks || !userTasks.length) return right(nothing())
        return right(just(userTasks))
    }

    async findById(userId: string, taskId: string): Promise<Either<Maybe<Task>>> {
        const userTasks = this.tasks[userId]
        const task = userTasks?.find(t => t.id === taskId)
        if (!task) return right(nothing())
        return right(just(task))
    }

    async create(userId: string, task: Task): Promise<Either<void>> {
        const userTasks = this.tasks[userId]
        if (!userTasks) this.tasks[userId] = [task]
        else userTasks.push(task)
        return right(void 0)
    }

    async update(userId: string, task: Partial<TaskProps> & { id: string }): Promise<Either<void>> {
        const userTasks = this.tasks[userId]
        if (!userTasks || !userTasks.length) return left(new NotFoundError('User tasks not found'))

        const taskIndex = userTasks.findIndex(t => t.id === task.id)
        if (taskIndex === -1) return left(new NotFoundError('Task not found'))
        const prevTask = this.tasks[userId][taskIndex]

        const newTask = { ...prevTask, ...task } as TaskProps
        const taskEntity = Task.create(newTask)
        if (taskEntity.isLeft()) return left(taskEntity.error)

        this.tasks[userId][taskIndex] = taskEntity.result
        return right(void 0)
    }

    async delete(userId: string, taskId: string): Promise<Either<void>> {
        const userTasks = this.tasks[userId]
        if (!userTasks || !userTasks.length) return left(new NotFoundError('User tasks not found'))

        const taskIndex = userTasks.findIndex(t => t.id === taskId)
        if (taskIndex === -1) return left(new NotFoundError('Task not found'))

        delete this.tasks[userId][taskIndex]
        return right(void 0)
    }
}
