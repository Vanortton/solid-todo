import { beforeEach, describe, expect, it, test } from 'vitest'
import { DeleteTaskUseCase } from './DeleteTaskUseCase'
import { InMemoryTaskRepository } from '../../repositories/taskRepository/InMemoryTaskRepository'
import { Task, TaskProps } from '../../../domain/entities/Task'
import { UpdateTaskDTO } from '../updateTask/UpdateTaskDTO'
import { DeleteTaskDTO } from './DeleteTaskDTO'
import { MissingParamsError } from '../../../core/errors/dictionary/MissingParamsError'

const task: TaskProps = {
    status: 'todo',
    description: 'Test useCase',
}

const validInput: UpdateTaskDTO = {
    userId: 'user123',
    task: {
        id: 'task123',
        ...task,
    },
}

describe('DeleteTask UseCase', () => {
    let useCase: DeleteTaskUseCase

    beforeEach(() => {
        const repository = new InMemoryTaskRepository()
        const taskEntity = Task.create(task, validInput.task.id)
        if (taskEntity.isLeft()) throw new Error(taskEntity.error.message)
        repository.create(validInput.userId, taskEntity.result)
        useCase = new DeleteTaskUseCase(repository)
    })

    it('should delete with valid data', async () => {
        const result = await useCase.execute({ userId: validInput.userId, taskId: validInput.task.id })
        expect(result.isRight()).toEqual(true)
    })

    test.each(['userId', 'taskId'] as (keyof DeleteTaskDTO)[])('should return left if missing %s', async field => {
        const input = { userId: validInput.userId, taskId: validInput.task.id }
        delete input[field]
        const task = await useCase.execute(input)
        expect(task.isLeft()).toEqual(true)
        if (task.isLeft()) expect(task.error).toBeInstanceOf(MissingParamsError)
    })
})
