import { describe, expect, it, test } from 'vitest'
import { Task, TaskProps } from './Task'
import { MissingParamsError } from '../../core/errors/dictionary/MissingParamsError'
import { InvalidDataError } from '../../core/errors/dictionary/InvalidDataError'

const validInput: TaskProps = {
    status: 'todo',
    description: 'Test entity',
}

const invalidInput = {
    status: 'invalid',
    description: 123,
} as unknown as TaskProps

describe('Task Entity', () => {
    it('should return task entity with valid data', () => {
        const task = Task.create(validInput)
        expect(task.isRight()).toEqual(true)
        if (task.isRight()) expect(task.result).toBeInstanceOf(Task)
    })

    test.each(['status', 'description'] as (keyof TaskProps)[])('should return left if missing %s', field => {
        const input = { ...validInput }
        delete input[field]
        const task = Task.create(input)
        expect(task.isLeft()).toEqual(true)
        if (task.isLeft()) expect(task.error).toBeInstanceOf(MissingParamsError)
    })

    test.each(['status', 'description'] as (keyof TaskProps)[])('should return left if %s is invalid', field => {
        const input = { ...validInput, [field]: invalidInput[field] }
        const task = Task.create(input)
        expect(task.isLeft()).toEqual(true)
        if (task.isLeft()) expect(task.error).toBeInstanceOf(InvalidDataError)
    })
})
