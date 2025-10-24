import { describe, expect, it } from 'vitest'
import { Entity } from './Entity'
import { Either, left, right } from '../errors/either/Either'
import { MissingParamsError } from '../errors/dictionary/MissingParamsError'
import { InvalidDataError } from '../errors/dictionary/InvalidDataError'

interface FakeEntityProps {
    field: string
}

class FakeEntity extends Entity<FakeEntityProps> {
    private constructor(props: FakeEntityProps, id?: string) {
        super(props, id)
    }

    get id() {
        return this._id
    }

    static create(props: FakeEntityProps, id?: string): Either<FakeEntity> {
        return right(new FakeEntity(props, id))
    }

    static firstLeft(...validations: Either<void>[]): Either<void> {
        return super.firstLeft(...validations)
    }
}

describe('Core Entity', () => {
    it('should use provided ID if informed', () => {
        const fake = FakeEntity.create({ field: 'value' }, 'test123')
        expect(fake.isRight()).toEqual(true)
        if (fake.isRight()) {
            expect(fake.result).toBeInstanceOf(FakeEntity)
            expect(fake.isRight() ? fake.result.id : null).toEqual('test123')
        }
    })

    it('should return left if one validation is left', () => {
        const firstValidation = (): Either<void> => right(undefined)
        const secondValidation = (): Either<void> => left(new MissingParamsError('fake'))
        const thirdValidation = (): Either<void> => left(new InvalidDataError('fake'))

        const validation = FakeEntity.firstLeft(firstValidation(), secondValidation(), thirdValidation())

        expect(validation.isLeft()).toEqual(true)
        if (validation.isLeft()) expect(validation.error).toBeInstanceOf(MissingParamsError)
    })
})
