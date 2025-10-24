import crypto from 'node:crypto'
import { Either, left, right } from '../errors/either/Either'

export class Entity<T> {
    protected props: T
    protected _id: string

    constructor(props: T, id?: string) {
        this.props = props
        if (id) this._id = id
        else this._id = crypto.randomUUID()
    }

    protected static firstLeft(...validations: Either<void>[]): Either<void> {
        for (const validation of validations) if (validation.isLeft()) return left(validation.error)
        return right(undefined)
    }
}
