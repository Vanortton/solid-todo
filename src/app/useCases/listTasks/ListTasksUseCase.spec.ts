import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../../repositories/taskRepository/InMemoryTaskRepository'
import { ListTasksUseCase } from './ListTasksUseCase'
import { Task, TaskProps } from '../../../domain/entities/Task'
import { ListTasksDTO } from './ListTasksDTO'
import { MissingParamsError } from '../../../core/errors/dictionary/MissingParamsError'

const taskData: TaskProps = {
    status: 'todo',
    description: 'ListTasks test',
}

const validInput: ListTasksDTO = {
    userId: 'user123',
}

describe('ListTasks UseCase', () => {
    let useCase: ListTasksUseCase
    let repository: InMemoryTaskRepository

    beforeEach(async () => {
        repository = new InMemoryTaskRepository()
        useCase = new ListTasksUseCase(repository)
    })

    it('should return nothing() when user has no tasks', async () => {
        const result = await useCase.execute(validInput)
        expect(result.isRight()).toEqual(true)
        if (result.isRight()) expect(result.result.isEmpty()).toEqual(true)
    })

    it('should return just(tasks) when user has tasks', async () => {
        const entity = Task.create(taskData, 'task123')
        if (entity.isLeft()) throw new Error(entity.error.message)
        await repository.create(validInput.userId, entity.result)

        const result = await useCase.execute(validInput)
        expect(result.isRight()).toEqual(true)
        if (result.isRight()) {
            expect(result.result.isJust()).toEqual(true)
            if (result.result.isJust()) {
                expect(result.result.value.length).toBe(1)
                expect(result.result.value[0].description).toBe(taskData.description)
            }
        }
    })

    it('should return left if userId is missing', async () => {
        const result = await useCase.execute({} as ListTasksDTO)
        expect(result.isLeft()).toEqual(true)
        if (result.isLeft()) expect(result.error).toBeInstanceOf(MissingParamsError)
    })
})
