import { describe, expect, it } from 'vitest'
import { Either, left, right } from './Either'
import { AppError } from '../AppError'

describe('Error Handling - Either', () => {
    it('should result isLeft when return left', () => {
        const fn = (): Either<void> => left(new AppError(500, 'ERROR', 'message'))
        expect(fn().isRight()).toEqual(false)
        expect(fn().isLeft()).toEqual(true)
    })

    it('should result isRight() when return right', () => {
        const fn = (): Either<void> => right(undefined)
        expect(fn().isRight()).toEqual(true)
        expect(fn().isLeft()).toEqual(false)
    })
})
