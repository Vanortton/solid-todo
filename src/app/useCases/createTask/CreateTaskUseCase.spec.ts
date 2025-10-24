import { beforeEach, describe, expect, it, test } from 'vitest'
import { CreateTaskUseCase } from './CreateTaskUseCase'
import { InMemoryTaskRepository } from '../../repositories/taskRepository/InMemoryTaskRepository'
import { CreateTaskDTO } from './CreateTaskDTO'
import { Task } from '../../../domain/entities/Task'
import { MissingParamsError } from '../../../core/errors/dictionary/MissingParamsError'
import { InvalidDataError } from '../../../core/errors/dictionary/InvalidDataError'

const validInput: CreateTaskDTO = {
    userId: 'user123',
    task: {
        status: 'todo',
        description: 'Test useCase',
    },
}

const invalidInput = {
    userId: 123,
    task: {
        status: 'invalid',
        description: '.',
    },
} as unknown as CreateTaskDTO

describe('CreateTask UseCase', () => {
    let useCase: CreateTaskUseCase

    beforeEach(() => {
        const repository = new InMemoryTaskRepository()
        useCase = new CreateTaskUseCase(repository)
    })

    it('should create with valid data', async () => {
        const task = await useCase.execute(validInput)
        expect(task.isRight()).toEqual(true)
        if (task.isRight()) expect(task.result).toBeInstanceOf(Task)
    })

    test.each(['userId', 'task'] as (keyof CreateTaskDTO)[])('should return left if missing %s', async field => {
        const input = { ...validInput }
        delete input[field]
        const task = await useCase.execute(input)
        expect(task.isLeft()).toEqual(true)
        if (task.isLeft()) expect(task.error).toBeInstanceOf(MissingParamsError)
    })

    test.each(['userId', 'task'] as (keyof CreateTaskDTO)[])('should return left if %s is invalid', async field => {
        const input = { ...validInput, [field]: invalidInput[field] }
        const task = await useCase.execute(input)
        expect(task.isLeft()).toEqual(true)
        if (task.isLeft()) expect(task.error).toBeInstanceOf(InvalidDataError)
    })
})
