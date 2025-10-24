import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryTaskRepository } from '../../repositories/taskRepository/InMemoryTaskRepository'
import { Task, TaskProps } from '../../../domain/entities/Task'
import { MissingParamsError } from '../../../core/errors/dictionary/MissingParamsError'
import { UpdateTaskDTO } from './UpdateTaskDTO'
import { UpdateTaskUseCase } from './UpdateTaskUseCase'

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

describe('UpdateTask UseCase', () => {
    let useCase: UpdateTaskUseCase

    beforeEach(async () => {
        const repository = new InMemoryTaskRepository()
        const taskEntity = Task.create(task, validInput.task.id)
        if (taskEntity.isLeft()) throw new Error(taskEntity.error.message)
        repository.create(validInput.userId, taskEntity.result)
        useCase = new UpdateTaskUseCase(repository)
    })

    it('should create with valid data', async () => {
        const task = await useCase.execute(validInput)
        expect(task.isRight()).toEqual(true)
    })

    test.each(['userId', 'task'] as (keyof UpdateTaskDTO)[])('should return left if missing %s', async field => {
        const input = { ...validInput }
        delete input[field]
        const task = await useCase.execute(input)
        expect(task.isLeft()).toEqual(true)
        if (task.isLeft()) expect(task.error).toBeInstanceOf(MissingParamsError)
    })
})
