import type { AppError } from '../AppError.js'

// Error
export class Left<R> {
    constructor(readonly error: AppError) {}

    isRight(): this is Right<R> {
        return false
    }

    isLeft(): this is Left<AppError> {
        return true
    }
}

// Success
export class Right<R> {
    constructor(readonly result: R) {}

    isRight(): this is Right<R> {
        return true
    }

    isLeft(): this is Left<R> {
        return false
    }
}

export type Either<R> = Left<R> | Right<R>

// Create instances
export const left = <R>(value: AppError): Either<R> => new Left(value)
export const right = <R>(value: R): Either<R> => new Right(value)
