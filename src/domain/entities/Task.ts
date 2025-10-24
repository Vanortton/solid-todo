import { Entity } from '../../core/domain/Entity'
import { InvalidDataError } from '../../core/errors/dictionary/InvalidDataError'
import { MissingParamsError } from '../../core/errors/dictionary/MissingParamsError'
import { Either, left, right } from '../../core/errors/either/Either'
import { TaskStatus, taskStatusArray } from '../types/StatusTypes'

export interface TaskProps {
    status: TaskStatus
    description: string
}

export class Task extends Entity<TaskProps> {
    private constructor(props: TaskProps, id?: string) {
        super(props, id)
    }

    get id() {
        return this._id
    }

    get status() {
        return this.props.status
    }

    get description() {
        return this.props.description
    }

    private static validateStatus(status: TaskStatus): Either<void> {
        if (!status) return left(new MissingParamsError('status'))
        if (typeof status !== 'string') return left(new InvalidDataError('status', 'Expected string'))
        if (!taskStatusArray.includes(status))
            return left(new InvalidDataError('status', `Expected one of ${taskStatusArray.join(', ')}`))
        return right(void 0)
    }

    private static validateDescription(description: string): Either<void> {
        if (!description) return left(new MissingParamsError('description'))
        if (typeof description !== 'string') return left(new InvalidDataError('description', 'Expected string'))
        if (description.trim().length < 3) return left(new InvalidDataError('description', 'Too short'))
        return right(void 0)
    }

    static create(props: TaskProps, id?: string): Either<Task> {
        const validation = super.firstLeft(
            this.validateStatus(props.status),
            this.validateDescription(props.description)
        )
        if (validation.isLeft()) return left(validation.error)
        return right(new Task(props, id))
    }

    toJSON() {
        return {
            id: this._id,
            ...this.props,
        }
    }
}
